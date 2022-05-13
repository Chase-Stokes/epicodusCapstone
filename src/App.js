import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import './default.scss';

function App() {
  return (
    <div className='App'>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
