import { put, fork, takeLatest } from 'redux-saga/effects';
import { constants as tableConstants, actions as tableActions } from '../modules/table';



export function* fetchStakeTable() {
  // pretend there is an api call
  const result = [
    {
      staker: 1,
      address: '0x39434345AECB11234234',
      stakeAmount: 1123,
      orderPostLimit: 2323423423,
    },
    {
      staker: 2,
      address: '0x39434345AECB11234234',
      stakeAmount: 1125,
      orderPostLimit: 2323423423,
    },
    {
      staker: 3,
      address: '0x39434345457723234234',
      stakeAmount: 1125,
      orderPostLimit: 2323423423,
    },
    {
      staker: 4,
      address: '0x394342345AECB23234234',
      stakeAmount: 1126,
      orderPostLimit: 2323423423,
    },        
  ];

  yield put(tableActions.updateTableData(result));
}


function* watchFetchingStakeTable() {
  yield takeLatest(tableConstants.SERVER_GET_TABLE_DATA, fetchStakeTable);
}

export const tableSaga = [
  fork(watchFetchingStakeTable),
];
