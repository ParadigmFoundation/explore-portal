import { select, put, fork, takeLatest, call } from 'redux-saga/effects';
import { constants as balanceConstants, actions as balanceActions } from '../modules/balance';

export function* getBalance(action) {

  const state = yield select();
  const {create} = state.init.toJS();
    
  try {
    if(action.payload.type === 'weth') {
      const wethWei = yield create.getUserWethBalance();
      const weth = create.convertFromWei(wethWei);
      yield put(balanceActions.updateBalance({weth}));
    } 
    else if(action.payload.type === 'zrx') {
      const zrxWei = yield create.getUserZrxBalance();
      const zrx = create.convertFromWei(zrxWei.toString());
      yield put(balanceActions.updateBalance({zrx}));
    } 
    else if(action.payload.type === 'dai') {
      const daiWei = yield create.getUserDaiBalance();
      const dai = create.convertFromWei(daiWei.toString());
      yield put(balanceActions.updateBalance({dai}));
    }
  } catch(error) {
    console.log(error);
  }
}

function* watchGetBalance() {
  yield takeLatest(balanceConstants.CREATE_GET_BALANCE, getBalance);
}

export const balanceSaga = [
  fork(watchGetBalance),
];
