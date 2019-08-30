import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import ethereum from "./modules/ethereum";
import websocket from "./modules/websocket";
import explore from "./modules/explore";
import balance from "./modules/balance";
import init from "./modules/init";
import bandwidthlimit from "./modules/bandwidthlimit";
import ticker from "./modules/ticker";

export default combineReducers({
  ethereum,
  routing,
  websocket,
  explore,
  balance,
  init,
  bandwidthlimit,
  ticker
});
