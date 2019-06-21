import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const POST_ORDER = 'POST_ORDER'
const POST_VERIFY_FAILED = 'POST_VERIFY_FAILED'
const POST_POSTING = 'POST_POSTING'
const POST_POSTED = 'POST_POSTED'

export const constants = {
  POST_ORDER,
  POST_VERIFY_FAILED,
  POST_POSTING,
  POST_POSTED
};

export const postOrder  = createAction(
  POST_ORDER,
  (orderJson) => {
    return { 
      orderJson,
      invalid: false,
      verifying: true,
      verified: false,
      failed: false,
      posting: false,
      posted: false
    };
  }
);

export const postVerifyFailed  = createAction(
  POST_VERIFY_FAILED,
  () => {
    return {
      invalid: true,
      verifying: false,
      failed: true,
      verified: false,
      posting: false,
      posted: false
    }
  }
);

export const postPosting  = createAction(
  POST_POSTING,
  () => {
    return {
      invalid: false,
      verifying: false,
      verified: true,
      posting: true,
      posted: false
    }
  }
);

export const postPosted  = createAction(
  POST_POSTED,
  (result) => {
    return {
      result,
      invalid: false,
      verifying: false,
      verified: true,
      posting: false,
      posted: true
    }
  }
);


export const actions = {
  postOrder,
  postVerifyFailed,
  postPosting,
  postPosted
};

export const reducers = {
  [ POST_ORDER]: (state, { payload }) => state.merge({
    ...payload,
  }),  
  [ POST_VERIFY_FAILED]: (state, { payload }) => state.merge({
    ...payload,
  }),  
  [ POST_POSTING]: (state, { payload }) => state.merge({
    ...payload,
  }),  
  [ POST_POSTED]: (state, { payload }) => state.merge({
    ...payload,
  }),  
}

export const initialState = () => Map({
  result: {},
  invalid: false,
  verifying: false,
  verified: false,
  failed: false,
  posting: false,
  posted: false
})

export default handleActions(reducers, initialState());
