import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';

import './default.scss';

function App() {
  return (
    <div className='App'>
        <Routes>
            <Route exact path="/" element={(
              <HomeLayout>
                <Homepage />
              </HomeLayout>
              )} />
            <Route exact path="/registration" element={(
              <MainLayout>
                <Registration />
              </MainLayout>
              )} />
            <Route exact path="/login" element={(
              <MainLayout>
                <Login />
              </MainLayout>
              )} />
        </Routes>
    </div>
  );
}

export default App;
