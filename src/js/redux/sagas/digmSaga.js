import { select, put, fork, takeLatest, call } from 'redux-saga/effects';
import { constants as stakeConstants, actions as stakeActions } from '../modules/digm';

export function* getStakeFromServer() {

  const state = yield select();
  const ethereum = state.ethereum.toJS();

  const {
    kosu,
    coinbase,
  } = ethereum;

  const walletBalance = yield kosu.kosuToken.balanceOf(coinbase);
  const userPosterTokens = yield kosu.posterRegistry.tokensRegisteredFor(coinbase);
  const totalPosterTokensContributed = yield kosu.posterRegistry.tokensContributed();
  const currentTreasuryBalance = yield kosu.treasury.currentBalance(coinbase);
  const systemBalance = yield kosu.treasury.systemBalance(coinbase);
  // const availableBalance = kosu.walletBalance.add(currentTreasuryBalance);

  const result = {
    walletBalance,
    userPosterTokens,
    totalPosterTokensContributed,
    currentTreasuryBalance,
    systemBalance,
    // availableBalance,
  };

  yield put(stakeActions.updateStakeData(result));
}

// Watchers
function* watchFetchingStake() {
  yield takeLatest(stakeConstants.GET_DIGM_DATA, getStakeFromServer);
}

export const digmSaga = [
  fork(watchFetchingStake),
];
