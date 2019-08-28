import { all } from "redux-saga/effects";
import { ethereumSaga } from "./ethereumSaga";
import { websocketSaga } from "./websocketSaga";
import { initSaga } from "./initSaga";
import { balanceSaga } from "./balanceSaga";
import { tickerSaga } from "./tickerSaga";

export default function* sagas() {
  yield all([
    ...ethereumSaga,
    ...websocketSaga,
    ...initSaga,
    ...balanceSaga,
    ...tickerSaga
  ]);
}
