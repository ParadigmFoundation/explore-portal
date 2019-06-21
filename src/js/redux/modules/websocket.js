import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
const WEBSOCKET_CONNECTED = 'WEBSOCKET_CONNECTED';

export const constants = {
  WEBSOCKET_CONNECT,
  WEBSOCKET_CONNECTED,
};

export const connectWebSocket = createAction(
  WEBSOCKET_CONNECT,
  (coinbase) => {
  return {
    coinbase,
    connecting: true
  }; 
});
export const getWebSocket = createAction(
  WEBSOCKET_CONNECTED,
  (webSocket) => {
    //console.log('getWebSocket action', webSocket);
    return { ...webSocket, connecting: false }
  }
);

export const actions = {
  connectWebSocket,
  getWebSocket,
};

export const reducers = {
  [WEBSOCKET_CONNECT]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [WEBSOCKET_CONNECTED]: (state, { payload }) => {
//    console.log('connected reducer', payload);
    return state.merge({
      ...payload,
    })
  },
};

export const initialState = () => Map({
});

export default handleActions(reducers, initialState());
