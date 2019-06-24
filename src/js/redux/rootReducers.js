import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ethereum from './modules/ethereum';
import table from './modules/table';
import digm from './modules/digm';
import post from './modules/post';
import websocket from './modules/websocket';
import explore from './modules/explore';
import balance from './modules/balance';
import bandwidthlimit from './modules/bandwidthlimit';
import init from './modules/init'

export default combineReducers({
  ethereum,
  table,
  digm,
  post,
  routing,
  websocket,
  explore,
  balance,
  bandwidthlimit,
  init,
});
