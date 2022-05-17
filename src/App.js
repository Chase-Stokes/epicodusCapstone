import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, handleUserProfile } from './firebase/utility';
import { setCurrentUser } from './redux/User/user.actions';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PasswordRecovery from './pages/RecoverPassword';

import './default.scss';


class App extends Component {

    authListener = null;
    componentDidMount() {
      const { setCurrentUser } = this.props;
      this.authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snap => {
            setCurrentUser({
              id : snap.id,
              ...snap.data()
            })
          })
        }
        setCurrentUser(userAuth);
      }); 
    }

    componentWillUnmount() {
      this.authListener();
    }

  render() {
      const { currentUser } = this.props; 

    return (
      <div className='App'>
          <Routes>
              <Route exact path="/" element={(
                <HomeLayout>
                  <Homepage />
                </HomeLayout>
              )} />
              <Route exact path="/registration"
                element={currentUser ? <Navigate to="/" /> : (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )} />
              <Route exact path="/login" 
                element={currentUser ? <Navigate to="/" /> : (
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
          </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
