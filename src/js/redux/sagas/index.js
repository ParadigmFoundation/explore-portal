import { all } from "redux-saga/effects";
import { ethereumSaga } from "./ethereumSaga";
import { websocketSaga } from "./websocketSaga";
import { balanceSaga } from "./balanceSaga";
import { tickerSaga } from "./tickerSaga";

export default function* sagas() {
  yield all([...ethereumSaga, ...websocketSaga, ...balanceSaga, ...tickerSaga]);
}
