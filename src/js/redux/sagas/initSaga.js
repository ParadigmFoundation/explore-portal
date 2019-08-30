import { select, put, fork, takeLatest, call, delay } from "redux-saga/effects";
import {
  constants as initConstants,
  actions as initActions
} from "../modules/init";
import { actions as balanceActions } from "../modules/balance";

export function* initCreateInstance() {
  const createInstance = new Create();
  try {
    yield createInstance.init();
    console.log("Create instance initialized successfully");
    const networkId = yield createInstance.web3.eth.net.getId();
    console.log("networkid in saga", networkId);

    yield put(
      initActions.initialized({
        create: createInstance,
        networkId: networkId
      })
    );
    yield put(balanceActions.getBalance("dai"));
  } catch (error) {
    const networkId = yield createInstance.web3.eth.net.getId();
    yield put(
      initActions.initialized({
        error: error,
        networkId: networkId
      })
    );
  }
}

// Watchers
function* watchInitCreate() {
  yield takeLatest(initConstants.CREATE_INIT, initCreateInstance);
}

export const initSaga = [fork(watchInitCreate)];
