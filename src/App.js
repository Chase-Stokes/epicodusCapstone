import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utility';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PasswordRecovery from './pages/RecoverPassword';

import './default.scss';

const initialState = {
  currentUser: null
};

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ...initialState
      }
    }

    authListener = null;
    componentDidMount() {
      this.authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snap => {
            this.setState({
              currentUser : {
                id : snap.id,
                ...snap.data()
              }
            })
          })
        }
        this.setState({
          ...initialState
        })
      }); 
    }

    componentWillUnmount() {
      this.authListener();
    }

  render() {
      const { currentUser } = this.state; 

    return (
      <div className='App'>
          <Routes>
              <Route exact path="/" element={(
                <HomeLayout currentUser={currentUser}>
                  <Homepage />
                </HomeLayout>
              )} />
              <Route exact path="/registration"
                element={currentUser ? <Navigate to="/" /> : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )} />
              <Route exact path="/login" 
                element={currentUser ? <Navigate to="/" /> : (
                  <MainLayout currentUser={currentUser}>
                    <Login />
                  </MainLayout>
              )} />    
              <Route exact path="/recovery" 
                element={(
                  <MainLayout currentUser={currentUser}>
                    <PasswordRecovery />
                  </MainLayout>
              )} />
          </Routes>
      </div>
    );
  }
}

export default App;
