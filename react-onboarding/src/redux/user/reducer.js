import { SET_SESSION_ID, SET_USER_DETAILS } from './actions';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: payload,
        isAuthenticated: true,
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: payload,
      };
    default:
      return state;
  }
};
