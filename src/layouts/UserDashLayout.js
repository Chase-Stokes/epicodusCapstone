import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../redux/User/user.actions';

import Header from './../components/Header';
import UserNav from './../components/UserNav';
import Footer from './../components/Footer';

const UserDashLayout = props => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <>
            <div className="dashboardLayout">
                <Header {...props} />
                    <div className="controlPanel">
                        <div className="sidebar">
                            <UserNav>
                                <ul>
                                <li>
                                    <Link to="/dashboard">
                                    Home
                                    </Link>
                                </li>
                                <li>
                                    <span className="signOut" onClick={() => signOut()}>
                                    Sign Out
                                    </span>
                                </li>
                                </ul>
                            </UserNav>
                        </div>
                        <div className="content">
                            {props.children}
                        </div>
                    </div>
            </div>
            <Footer />
        </>
    );
};

export default UserDashLayout;