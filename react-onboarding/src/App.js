import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import VideoPlayer from './views/VIdeoPlayer/VideoPlayer';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/trailer/:id" element={<VideoPlayer />} />
  </Routes>
);

export default App;
