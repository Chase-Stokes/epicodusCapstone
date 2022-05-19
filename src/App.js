import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSignIn } from './redux/User/user.actions';
import IsAuthorized from './higherOrderComponent/IsAuthorized';
import IsAdmin from './higherOrderComponent/IsAdmin';
import AdminStuff from './components/AdminStuff';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PasswordRecovery from './pages/RecoverPassword';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

import './default.scss';


const App = props => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkUserSignIn());
    }, [])


    return (
      <div className='App'>
        <AdminStuff />
          <Routes>
              <Route exact path="/" element={(
                <HomeLayout>
                  <Homepage />
                </HomeLayout>
              )} />
              <Route exact path="/registration"
                element={(
                <MainLayout>
                  <Registration />
                </MainLayout>
              )} />
              <Route exact path="/login" 
                element={(
                  <MainLayout>
                    <Login />
                  </MainLayout>
              )} />    
              <Route exact path="/recovery" 
                element={(
                  <MainLayout>
                    <PasswordRecovery />
                  </MainLayout>
              )} />
              <Route exact path="/dashboard" 
                element={(
                  <IsAuthorized>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </IsAuthorized>
              )} />
              <Route exact path="/admin" 
                element={(
                  <IsAdmin>
                    <MainLayout>
                      <Admin />
                    </MainLayout>
                  </IsAdmin>
                )} />
          </Routes>
      </div>
    );
}

export default App;
