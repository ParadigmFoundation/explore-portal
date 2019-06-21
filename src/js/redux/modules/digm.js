import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const GET_DIGM_DATA = 'GET_DIGM_DATA';
const UPDATE_DIGM_DATA = 'UPDATE_DIGM_DATA';

export const constants = {
  GET_DIGM_DATA,
  UPDATE_DIGM_DATA,
};

export const getDigmData = createAction(GET_DIGM_DATA, () => ({ fetching: true }));
export const updateStakeData = createAction(UPDATE_DIGM_DATA, (result) => ({ ...result, fetching: false, saving: false }));

export const actions = {
  getDigmData,
  updateStakeData,
};

export const reducers = {
  [GET_DIGM_DATA]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [UPDATE_DIGM_DATA]: (state, { payload }) => state.merge({
    ...payload,
  }),
};

export const initialState = () => Map({
  walletBalance: 0,
  userPosterTokens: 0,
  totalPosterTokensContributed: 0,
  currentTreasuryBalance: 0,
  systemBalance: 0,
  availableBalance: 0,
});

export default handleActions(reducers, initialState());
