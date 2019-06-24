import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SERVER_GET_TABLE_DATA = 'SERVER_GET_TABLE_DATA'
const UPDATE_TABLE_DATA = 'UPDATE_TABLE_DATA'

export const constants = {
  SERVER_GET_TABLE_DATA,
  UPDATE_TABLE_DATA,
};

export const getTableData  = createAction(SERVER_GET_TABLE_DATA, () => ({ fetching: true,fetched: false }));
export const updateTableData  = createAction(UPDATE_TABLE_DATA, (result) => ({ result, fetching: false, fetched: true }));


export const actions = {
  getTableData,
  updateTableData,
};

export const reducers = {
  [ SERVER_GET_TABLE_DATA]: (state, { payload }) => state.merge({
    ...payload,
  }),  
  [ UPDATE_TABLE_DATA]: (state, { payload }) => state.merge({
    ...payload,
  }),  

}

export const initialState = () => Map({
  result: {},
})

export default handleActions(reducers, initialState());
