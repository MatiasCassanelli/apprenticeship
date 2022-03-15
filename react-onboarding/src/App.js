import React from 'react';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Home from './views/Home/Home';

const App = () => (
  <div className="App">
    <NavBar />
    <Home />
    <Footer />
  </div>
);

export default App;
