import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase/utility';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';

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
      this.authListener = auth.onAuthStateChanged(userAuth => {
        if (!userAuth)
            this.setState({...initialState});

        this.setState({
          currentUser: userAuth
        });
      }); 
    }

    componentWillUnmount() {

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
              <Route exact path="/registration" element={(
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
          </Routes>
      </div>
    );
  }
}

export default App;
