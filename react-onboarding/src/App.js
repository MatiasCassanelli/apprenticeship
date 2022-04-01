import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import getCookie from './utils/getCookie';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import VideoPlayer from './views/VIdeoPlayer/VideoPlayer';

const App = () => {
  const { signIn, isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      const savedReqToken = getCookie('reqToken');
      if (savedReqToken) {
        signIn(savedReqToken);
      }
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/redirect" element={<Login redirected />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trailer/:id" element={<VideoPlayer />} />
    </Routes>
  );
};

export default App;
