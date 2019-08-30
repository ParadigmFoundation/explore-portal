import { select, put, fork, takeLatest, call } from "redux-saga/effects";
import {
  constants as balanceConstants,
  actions as balanceActions
} from "../modules/balance";
import { getCommonTokenAddress } from "../../common/services/helpers";

export function* getBalance(action) {
  const state = yield select();
  console.log(state.ethereum.toJS());
  const {
    kosu,
    networkId,
    web3,
    coinbase,
  } = state.ethereum.toJS();
  const { type } = action.payload;
  console.log(kosu);
  let tokenAddress;
  if (type === "WETH" || type === "ZRX" || type === "DAI") {
    tokenAddress = getCommonTokenAddress(networkId, type);
  }
  try {
    const wethWei = yield kosu.kosuToken.balanceOf(tokenAddress);

    const value = web3.utils.fromWei(wethWei.toString());
    yield put(balanceActions.updateBalance({ [type]: value }));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetBalance() {
  yield takeLatest(balanceConstants.CREATE_GET_BALANCE, getBalance);
}

export const balanceSaga = [fork(watchGetBalance)];
