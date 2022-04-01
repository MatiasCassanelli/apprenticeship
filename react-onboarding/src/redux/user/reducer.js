import { SET_SESSION_ID, SET_USER_DETAILS, DELETE_SESSION } from './actions';

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
    case DELETE_SESSION:
      return {
        ...state,
        isAuthenticated: false,
        sessionId: '',
        userDetails: {},
      };
    default:
      return state;
  }
};
