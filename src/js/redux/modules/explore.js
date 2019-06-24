import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const UPDATE_EXPLORE_DATA = 'UPDATE_EXPLORE_DATA';

export const constants = {
  UPDATE_EXPLORE_DATA,
};

export const updateExploreData = createAction(
  UPDATE_EXPLORE_DATA,
  (data) => {
//    console.log('updateExploreData action', data);
    return { ...data }
  }
);

export const actions = {
  updateExploreData,
};

export const reducers = {
  [UPDATE_EXPLORE_DATA]: (state, { payload }) => {
    //console.log('explore data reducer', payload);
    return state.merge({
      ...payload,
    })
  },
};

export const initialState = () => Map({
});

export default handleActions(reducers, initialState());
