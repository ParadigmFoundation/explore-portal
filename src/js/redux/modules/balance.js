import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const CREATE_GET_BALANCE = 'CREATE_GET_BALANCE';
const CREATE_UPDATE_BALANCE = 'CREATE_UPDATE_BALANCE';

export const constants = {
  CREATE_GET_BALANCE,
  CREATE_UPDATE_BALANCE,
};

export const getBalance = createAction(CREATE_GET_BALANCE, (type) => ({ type, fetching: true }));
export const updateBalance = createAction(CREATE_UPDATE_BALANCE, (res) => ({...res, fetching: false }));

export const actions = {
  getBalance,
  updateBalance,
};

export const reducers = {
  [ CREATE_GET_BALANCE ]: (state, { payload }) => {
    return state.merge({
      ...payload,
    })
  },
  [ CREATE_UPDATE_BALANCE ]: (state, { payload }) => {
    return state.merge({
      ...payload,
    })
  }, 
};

export const initialState = () => Map({
});

export default handleActions(reducers, initialState());
