import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const CREATE_INIT = 'CREATE_INIT';
const CREATE_INITIALIZED = 'CREATE_INITIALIZED';

export const constants = {
  CREATE_INIT,
  CREATE_INITIALIZED,
};

export const initCreateInstance = createAction(CREATE_INIT, () => ({ initializing: true }));
export const initialized = createAction(CREATE_INITIALIZED, (res) => ({...res, initializing: false }));

export const actions = {
  initCreateInstance,
  initialized,
};

export const reducers = {
  [CREATE_INIT]: (state, { payload }) => {
    return state.merge({
      ...payload,
    })
  },

  [CREATE_INITIALIZED]: (state, { payload }) => {
    return state.merge({
      ...payload,
    })
  },
};

export const initialState = () => Map({
});

export default handleActions(reducers, initialState());
