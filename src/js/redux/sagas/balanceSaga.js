import { select, put, fork, takeLatest, call } from "redux-saga/effects";
import {
  constants as balanceConstants,
  actions as balanceActions
} from "../modules/balance";

export function* getBalance() {
  const state = yield select();
  console.log(state.ethereum.toJS());
  const { kosuToken, networkId, web3, coinbase } = state.ethereum.toJS();

  try {
    const wei = yield kosuToken.balanceOf(coinbase);
    const value = web3.utils.fromWei(wei.toString());
    // const value = "111111";
    yield put(balanceActions.updateBalance({ balance: value }));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetBalance() {
  yield takeLatest(balanceConstants.CREATE_GET_BALANCE, getBalance);
}

export const balanceSaga = [fork(watchGetBalance)];
