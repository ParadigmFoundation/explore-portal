import { all } from 'redux-saga/effects'
import { ethereumSaga } from './ethereumSaga';
import { digmSaga } from './digmSaga';
import { tableSaga } from './tableSaga';
import { postSaga } from './postSaga';
import { websocketSaga } from './websocketSaga';


export default function* sagas() {
  yield all([
    ...tableSaga,
    ...digmSaga,
    ...postSaga,
    ...ethereumSaga,
    ...websocketSaga,
  ]);
}
