export const SET_SESSION_ID = 'user/SET_SESSION_ID';
export const SET_USER_DETAILS = 'user/SET_USER_DETAILS';
export const DELETE_SESSION = 'user/DELETE_SESSION';

const setSessionId = (payload) => ({
  type: SET_SESSION_ID,
  payload,
});

const setUserDetails = (payload) => ({
  type: SET_USER_DETAILS,
  payload,
});

const deleteSession = () => ({
  type: DELETE_SESSION,
});

export { setSessionId, setUserDetails, deleteSession };
