import { select, put, fork, takeLatest, call } from 'redux-saga/effects';
import { constants as postConstants, actions as postActions } from '../modules/post';
import { delay } from 'redux-saga';
import { isValid0xOrder, zrxFormatter } from "../../common/services/commonService";


export function* fetchPosting(msg) {
  // pretend there is an api call
  let order;
  let transactionID;
  let verified = false;
  let status = false;
  const state = yield select();
  const ethereum = state.ethereum.toJS();
  const { paradigmConnect, coinbase } = ethereum;
  const rawInput = msg.payload.orderJson;
  const subContract = "0x0afd97c4548d6a5db854d6b1b4b18138327f944c";
  const valid0x = isValid0xOrder(msg.payload.orderJson);
  if (valid0x) {
    const signedZeroExOrder = JSON.parse(rawInput)
    const makerValues = zrxFormatter(signedZeroExOrder);
    order = new paradigmConnect.Order({ maker: coinbase, subContract, makerValues });
    yield order.prepareForPost();
    verified = true;
  } else {
    // check if valid paradigm order
    verified = false;
  }

  if (verified) {
    yield put(postActions.postPosting());
  } else {
    yield put(postActions.postVerifyFailed());
    return { status: false };
  }

  const res = yield fetch("https://bs2.paradigm.market/post", {
    method: "POST",
    body: JSON.stringify(order.toJSON()),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json()).catch(() => {
    status = false;
  });

  if (res.message && /^\(unconfirmed\) orderID: (.*)$/.test(res.message)) {
    status = true
    transactionID = res.message.split("(unconfirmed) orderID: ")[1];
  }

  const result = {
    status,  // status of post orders.
    transactionID,
    link: `https://use.zaidan.io/0x/v2/orders/?makerAddress=${coinbase.toLowerCase()}`,
  };
  yield delay(1000);
  yield put(postActions.postPosted(result));
}

function* watchPosting() {
  yield takeLatest(postConstants.POST_ORDER, fetchPosting);
}

export const postSaga = [
  fork(watchPosting),
];
