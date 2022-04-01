import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getUserDetails,
  signIn as userSignIn,
  signOut as userSignOut,
} from '../services/user';
import {
  deleteSession,
  setSessionId,
  setUserDetails,
} from '../redux/user/actions';
import {
  getSessionId,
  getIsAuthenticated,
  getUserDetails as userDetailsSelector,
} from '../redux/user/selectors';
import getCookie from '../utils/getCookie';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const sessionId = useSelector(getSessionId);
  const userDetails = useSelector(userDetailsSelector);

  const userDetailsDispatcher = async (id) => {
    const details = await getUserDetails(id);
    const localUser = JSON.parse(localStorage.getItem('user')) || {};
    const finalUser = {
      ...localUser,
      ...details,
    };
    dispatch(setUserDetails(finalUser));
  };
  const signIn = async (reqToken) => {
    const savedSessionId = getCookie('sessionId');
    if (!savedSessionId) {
      const res = await userSignIn(reqToken);
      if (res?.success) {
        dispatch(setSessionId(res.session_id));
        document.cookie = `sessionId=${res.session_id}`;
        userDetailsDispatcher(sessionId);
        navigate('/');
      }
    } else {
      dispatch(setSessionId(savedSessionId));
      userDetailsDispatcher(savedSessionId);
      navigate('/');
    }
  };

  const signOut = async () => {
    const res = await userSignOut(sessionId);
    if (res?.success) {
      dispatch(deleteSession());
      document.cookie = `sessionId=`;
    }
  };

  const updateUserDetails = (newDetails) => {
    const newUser = {
      ...userDetails,
      ...newDetails,
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    dispatch(setUserDetails(newUser));
  };

  return {
    isAuthenticated,
    sessionId,
    userDetails,
    signIn,
    signOut,
    updateUserDetails,
  };
};

export default useAuth;
