const getSessionId = (state) => state.user.sessionId;
const getIsAuthenticated = (state) => state.user.isAuthenticated;
const getUserDetails = (state) => state.user?.userDetails;

export { getSessionId, getIsAuthenticated, getUserDetails };
