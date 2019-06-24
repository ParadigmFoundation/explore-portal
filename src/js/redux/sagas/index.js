import { all } from 'redux-saga/effects'
import { ethereumSaga } from './ethereumSaga';
import { digmSaga } from './digmSaga';
import { tableSaga } from './tableSaga';
import { postSaga } from './postSaga';
import { websocketSaga } from './websocketSaga';
import { initSaga } from './initSaga';
import { balanceSaga } from './balanceSaga';
import { tickerSaga } from './tickerSaga';

export default function* sagas() {
  yield all([
    ...tableSaga,
    ...digmSaga,
    ...postSaga,
    ...ethereumSaga,
    ...websocketSaga,
    ...initSaga,
    ...balanceSaga,
    ...tickerSaga
  ]);
}
