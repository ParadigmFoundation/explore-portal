import { put, fork, takeLatest, call, take, select } from "redux-saga/effects";
import Web3 from "web3";
import { Kosu, KosuToken } from "@kosu/kosu.js";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { ContractWrappers } from "0x.js";
import {
  constants as web3Constants,
  actions as web3Actions
} from "../modules/ethereum";
import { actions as websocketActions } from "../modules/websocket";
import { actions as tickerActions } from "../modules/ticker";
import { eventChannel } from "redux-saga";
import { actions as balanceActions } from "../modules/balance";
// const { Kosu } = require("@kosu/kosu.js");

function* createAccountsChangedEventChannel() {
  return eventChannel(emit => {
    window.ethereum.on("accountsChanged", () => {
      emit("accountsChanged");
    });

    return () => {};
  });
}
function* watchAccountsChanged() {
  const accountChangedChannel = yield createAccountsChangedEventChannel();
  while (true) {
    yield take(accountChangedChannel);
    yield put(web3Actions.updateCoinbase());
  }
}

export function* connectServer() {
  let web3;
  let coinbase;
  if (
    typeof window.ethereum !== "undefined" ||
    typeof window.web3 !== "undefined"
  ) {
    if (typeof window.ethereum !== "undefined") {
      yield window.ethereum.enable();
    }

    // Web3 browser user detected. You can now use the provider.
    const provider = window.ethereum || window.web3.currentProvider;

    yield fork(watchAccountsChanged);

    web3 = new Web3(provider);
    coinbase = yield call(web3.eth.getCoinbase);
  } else {
    web3 = new Web3("https://ropsten.infura.io"); // TODO env variable for network
    coinbase = "readonly";
  }
  const networkId = yield web3.eth.net.getId();
  const web3Wrapper = new Web3Wrapper(web3.currentProvider);
  const contractWrappers = new ContractWrappers(web3Wrapper.getProvider(), {
    networkId
  });
  const kosu = new Kosu({ provider: web3.currentProvider });
  const options = { web3, web3Wrapper };
  const kosuToken = new KosuToken(options);

  const connection = {
    web3,
    coinbase,
    connected: true,
    networkId,
    kosu,
    kosuToken,
    contractWrappers
  };

  // yield put(tickerActions.getTicker());
  yield put(web3Actions.getConnection(connection));
  yield put(websocketActions.connectWebSocket(coinbase));
  yield put(balanceActions.getBalance("DAI"));
}

function* updateCoinbase() {
  const state = yield select();
  const ethereum = state.ethereum.toJS();
  const coinbase = yield call(ethereum.web3.eth.getCoinbase);

  yield put(web3Actions.coinbaseUpdated(coinbase));
}

function* watchConnecting() {
  yield takeLatest(web3Constants.WEB3_CONNECT, connectServer);
}

function* watchUpdateCoinbase() {
  yield takeLatest(web3Constants.ETHEREUM_UPDATE_COINBASE, updateCoinbase);
}

export const ethereumSaga = [fork(watchConnecting), fork(watchUpdateCoinbase)];
