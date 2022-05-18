import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth, handleUserProfile } from './firebase/utility';
import { setCurrentUser } from './redux/User/user.actions';
import IsAuthorized from './higherOrderComponent/IsAuthorized';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PasswordRecovery from './pages/RecoverPassword';
import Dashboard from './pages/Dashboard';

import './default.scss';


const App = props => {

    const dispatch = useDispatch();
    // const { setCurrentUser } = props;

    useEffect(() => {
      const authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snap => {
            dispatch(setCurrentUser({
              id : snap.id,
              ...snap.data()
            }))
          })
        }
        dispatch(setCurrentUser(userAuth));
      }); 
      return () => {
        authListener(); //unsub to prevent memory leaks
      }
    }, [])


    return (
      <div className='App'>
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
          </Routes>
      </div>
    );

}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

export default App;
