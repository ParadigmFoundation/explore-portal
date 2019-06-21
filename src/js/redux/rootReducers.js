import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ethereum from './modules/ethereum';
import table from './modules/table';
import digm from './modules/digm';
import post from './modules/post';
import websocket from './modules/websocket';
import explore from './modules/explore';
import ballance from './modules/ballance';
import bandwidthlimit from './modules/bandwidthlimit';

export default combineReducers({
  ethereum,
  table,
  digm,
  post,
  routing,
  websocket,
  explore,
  ballance,
  bandwidthlimit,
});
