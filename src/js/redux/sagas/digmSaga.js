import { select, put, fork, takeLatest, call } from 'redux-saga/effects';
import { constants as stakeConstants, actions as stakeActions } from '../modules/digm';

export function* getStakeFromServer() {

  const state = yield select();
  const ethereum = state.ethereum.toJS();

  const {
    paradigmConnect,
    coinbase,
  } = ethereum;

  const walletBalance = yield paradigmConnect.digmToken.balanceOf(coinbase);
  const userPosterTokens = yield paradigmConnect.posterRegistry.tokensRegisteredFor(coinbase);
  const totalPosterTokensContributed = yield paradigmConnect.posterRegistry.tokensContributed();
  const currentTreasuryBalance = yield paradigmConnect.treasury.currentBalance(coinbase);
  const systemBalance = yield paradigmConnect.treasury.systemBalance(coinbase);
  const availableBalance = walletBalance.add(currentTreasuryBalance);

  const result = {
    walletBalance,
    userPosterTokens,
    totalPosterTokensContributed,
    currentTreasuryBalance,
    systemBalance,
    availableBalance,
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
