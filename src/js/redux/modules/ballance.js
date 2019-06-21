import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const UPDATE_BALLANCE = 'UPDATE_BALLANCE';

export const constants = {
  UPDATE_BALLANCE,
};

export const updateBallance  = createAction(UPDATE_BALLANCE, (result) => ({ ballance: result}));

export const actions = {
  updateBallance,
};

export const reducers = {
  [ UPDATE_BALLANCE]: (state, { payload }) => state.merge({
    ...payload,
  }),  
}

export const initialState = () => Map({
  result: {},
})

export default handleActions(reducers, initialState());
