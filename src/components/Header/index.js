import React from "react";
import { useSelector } from 'react-redux';
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utility'

import Logo from './../../assets/logo.jpg';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = props => {
    const { currentUser } = useSelector(mapState);
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Example Logo" />
                    </Link>
                </div>

                <div className='actionsCall'>
                    {currentUser && (
                        <ul>
                            <li>
                                <span onClick={() => auth.signOut()}>LOG OUT</span>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    )}
                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Log In
                                </Link>
                            </li>
                        </ul>
                    )}
                    
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
}



export default Header;