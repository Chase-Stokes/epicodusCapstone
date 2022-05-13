import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';

import './default.scss';

function App() {
  return (
    <div className='App'>
      <MainLayout>
        <Routes>
            <Route exact path="/" element={(<Homepage />)} />
            <Route path="/registration" element={(<Registration />)}/>  
          {/* <Route exact path="/" render={() => (
            <MainLayout>
            <Homepage />
            </MainLayout>
            )} />
            
            <Route path="/registration" render={() => (
              <MainLayout>
              <Registration />
              </MainLayout>
            )} />   */}

        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
