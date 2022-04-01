import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, signIn as userSignIn } from '../services/user';
import { setSessionId, setUserDetails } from '../redux/user/actions';
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

  useEffect(() => {
    if (isAuthenticated) {
      getUserDetails(sessionId).then((res) => {
        dispatch(setUserDetails(res));
      });
    }
  }, [isAuthenticated]);

  const signIn = async (reqToken) => {
    const savedSessionId = getCookie('sessionId');
    if (!savedSessionId) {
      const res = await userSignIn(reqToken);
      if (res?.success) {
        dispatch(setSessionId(res.session_id));
        document.cookie = `sessionId=${res.session_id}`;
        navigate('/');
      }
    } else {
      dispatch(setSessionId(savedSessionId));
      navigate('/');
    }
  };

  return { isAuthenticated, sessionId, userDetails, signIn };
};

export default useAuth;
