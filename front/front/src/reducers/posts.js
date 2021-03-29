import { REQUEST_STATE } from '../constants/constants';

export const initialState = {
  fetchState: REQUEST_STATE.INIATIAL,
  postsList: [],
};

export const postsActionTyps = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const postsReducer = (state, action) => {
  switch(action.type) {
    case postsActionTyps.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case postsActionTyps.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        postsList: action.payload.posts,
      };
    default:
      throw new Error();
  }
}
