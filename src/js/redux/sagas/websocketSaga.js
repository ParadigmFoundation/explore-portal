import { put, fork, call, take, takeLatest } from 'redux-saga/effects';
import { eventChannel} from 'redux-saga';

import { constants as webSocketConstants, actions as webSocketActions } from '../modules/websocket';
import { actions as exploreActions } from '../modules/explore';
import { actions as balanceActions } from '../modules/balance';
import { actions as bandwidthlimitActions } from '../modules/bandwidthlimit';

function* createEventChannel(mySocket ) {
  return eventChannel(emit => {
    mySocket.onmessage = (msg) => {
        return emit (msg);
    };
    return () => {
        mySocket .close();
    };
  });
}

function* initializeWebSocketsChannel(action) {
  // const mySocket = new WebSocket("wss://bs3.paradigm.market/explore");
  try {
    const mySocket = new WebSocket("wss://explore-api.kosu.io/");
    const channel = yield call(createEventChannel, mySocket );
    let subId;
    while (true) {
        const msg = yield take(channel);
        const msgData = msg.data.toString();
        const parsed = JSON.parse(msgData);
        const { id, code, data, message } = parsed;
        if (message) {
            // store our subId for future use
            subId = message.toString();
            const webSocket = {
              webSocket: mySocket,
              connected: true,
            };          
            yield put(webSocketActions.getWebSocket(webSocket));
            setInterval(() => {
              if(mySocket.readyState === WebSocket.OPEN) {
                const requestBalance = {
                  "id": "balance-request",
                  "method": "balance",
                  "param": action.payload.coinbase      
                }
                mySocket.send(JSON.stringify(requestBalance));
                const requestLimit = {
                  "id": "limit-request",
                  "method": "limit",
                  "param": action.payload.coinbase       
                }
                mySocket.send(JSON.stringify(requestLimit));
              }
              if((mySocket.readyState === WebSocket.CLOSING) || (mySocket.readyState === WebSocket.CLOSED)) {
                clearInterval();
              }
            },5000);
  
        // in this case, `data` is subscription data (see below)
        } else if (subId && id === subId && data) {
            // handle subscription data here
            console.log("got data: %o", data)
            yield put(exploreActions.updateExploreData(data));
  
        // in this case, the server has encountered an error processing a subscription
        } else if (subId && id === subId && !data) {
            // ignore this message and don't update displayed data
        
        // in this case `data` is an OK response to a client request
        } else if (subId && id !== subId && data && code === 0) {
          if(id === 'balance-request') {
            yield put(balanceActions.updateBalance(data));
          }
          else if (id === 'limit-request') {
            yield put(bandwidthlimitActions.updateBandWidthLimit(data));  
          }
            // handle server response message here  
            // the `id` field will be the same `id` that was included in the request
  
        /*
          in this case, an error was encountered processing a client request
          and the method has failed.
        */
        } else if (subId && !id && data && code === 1) {
            // the `data` field may contain error information
        
        // unexpected unknown case
        } else {
            // ignore?
        }
    }
  }
  catch(err) {
    console.log(err);
    
  }

}

export default function* watchWebSocket() {
  yield [
    takeLatest(webSocketConstants.WEBSOCKET_CONNECT, initializeWebSocketsChannel)
  ];
}
export const websocketSaga = [
  fork(watchWebSocket),
];

