import { put, fork, takeLatest, call } from "redux-saga/effects";
import {
  constants as tickerConstants,
  actions as tickerActions
} from "../modules/ticker";
import axios from "axios";
import { delay } from "q";

const api_url = "https://api.cryptonator.com/api/ticker/";

export function* getTicker() {
  while (true) {
    try {
      console.log("ticker is running");
      const weth = yield call(axios.get, api_url + "eth-usd");
      const dai = yield call(axios.get, api_url + "dai-usd");
      const zrx = yield call(axios.get, api_url + "zrx-usd");
      const result = {
        weth: weth.data.ticker.price,
        dai: dai.data.ticker.price,
        zrx: zrx.data.ticker.price
      };
      console.log(result);
      yield put(tickerActions.updateTicker(result));
    } catch (error) {
      console.log(error);
    }
    yield delay(600000);
  }
}

function* watchGetTicker() {
  yield takeLatest(tickerConstants.GET_TICKER, getTicker);
}

export const tickerSaga = [fork(watchGetTicker)];
