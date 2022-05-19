import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../redux/User/user.actions'
import './styles.scss';
import { Link } from 'react-router-dom';

import Logo from './../../assets/logo_beige.png';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = props => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const signOut = () => {
        dispatch(signOutUserStart())
    }
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
                                <span onClick={() => signOut()}>LOG OUT</span>
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