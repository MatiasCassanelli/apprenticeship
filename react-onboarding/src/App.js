/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import useQueryParams from './hooks/useQueryParams';
import { getAuthToken } from './services/user';
import getCookie from './utils/getCookie';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Profile from './views/Profile/Profile';
import VideoPlayer from './views/VIdeoPlayer/VideoPlayer';

const ProtectedRoute = ({
  isAuthenticated,
  children,
  redirectPath = '/login',
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

const App = () => {
  const { signIn, isAuthenticated } = useAuth();
  const query = useQueryParams();
  const tokenParam = query.get('request_token');
  const firstLunch = useRef(true);
  useEffect(() => {
    const sessionId = getCookie('sessionId');
    const savedReqToken = getCookie('reqToken');
    if (!sessionId) {
      if (!tokenParam && !savedReqToken) {
        if (!firstLunch.current) {
          getAuthToken();
        }
      } else {
        signIn({ reqToken: savedReqToken || tokenParam });
      }
    } else {
      signIn({ session: sessionId });
    }
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Home />} />
        <Route path="/trailer/:id" element={<VideoPlayer />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login/redirect" element={<Login redirected />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<p>Nothing here: 404!</p>} />
    </Routes>
  );
};

export default App;
