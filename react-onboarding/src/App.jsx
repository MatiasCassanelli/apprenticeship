import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <h1 className="text-3xl font-bold underline text-blue-500">
        Hello world!
      </h1>
    </div>
  );
};

export default App;
