import React from 'react';
import './default.scss';
import Header from './components/Header';
import Homepage from './pages/Homepage/index';

function App() {
  return (
    <div className='App'>
      <Header />
      <Homepage />
    </div>
  );
}

export default App;
