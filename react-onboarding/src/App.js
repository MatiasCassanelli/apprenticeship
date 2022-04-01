import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import getCookie from './utils/getCookie';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Profile from './views/Profile/Profile';
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
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/redirect" element={<Login redirected />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trailer/:id" element={<VideoPlayer />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
