import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const WEB3_CONNECT = 'WEB3_CONNECT';
const WEB3_CONNECTED = 'WEB3_CONNECTED';
const ETHEREUM_UPDATE_COINBASE = 'ETHEREUM_UPDATE_COINBASE';
const ETHEREUM_COINBASE_UPDATED = 'ETHEREUM_COINBASE_UPDATED';

export const constants = {
  WEB3_CONNECT,
  WEB3_CONNECTED,
  ETHEREUM_UPDATE_COINBASE,
  ETHEREUM_COINBASE_UPDATED,
};

export const connectServer = createAction(WEB3_CONNECT, () => ({ connecting: true }));
export const updateCoinbase = createAction(ETHEREUM_UPDATE_COINBASE, () => {
  console.log('updateCoinbase called');
  return {};
});
export const coinbaseUpdated = createAction(
  ETHEREUM_COINBASE_UPDATED,
  (coinbase) => ({ coinbase })
);
export const getConnection = createAction(
  WEB3_CONNECTED,
  (connection) => {
    return { ...connection, connecting: false }
  }
);


export const actions = {
  connectServer,
  getConnection,
  updateCoinbase,
  coinbaseUpdated,
};

export const reducers = {
  [WEB3_CONNECT]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [WEB3_CONNECTED]: (state, { payload }) => {
    return state.merge({
      ...payload,
    })
  },
  [ETHEREUM_COINBASE_UPDATED]: (state, { payload }) => {
    return state.merge({
      ...payload,
    })
  },
  [ETHEREUM_UPDATE_COINBASE]: (state, { payload }) => {
    console.log('updateCoinbase reduced')
    return state.merge({
    })
  },
};

export const initialState = () => Map({
});

export default handleActions(reducers, initialState());
