import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const UPDATE_BAND_WIDTH_LIMIT = 'UPDATE_BAND_WIDTH_LIMIT';

export const constants = {
  UPDATE_BAND_WIDTH_LIMIT,
};

export const updateBandWidthLimit  = createAction(UPDATE_BAND_WIDTH_LIMIT, (result) => ({ bandWidthLimit: result}));

export const actions = {
  updateBandWidthLimit,
};

export const reducers = {
  [ UPDATE_BAND_WIDTH_LIMIT]: (state, { payload }) => state.merge({
    ...payload,
  }),  
}

export const initialState = () => Map({
  result: {},
})

export default handleActions(reducers, initialState());
