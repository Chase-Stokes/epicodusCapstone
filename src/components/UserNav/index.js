import React from 'react';
import { useSelector } from 'react-redux'
import UserProfile from './../UserProfile';
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const UserNav = ({ children }) => {
    const { currentUser } = useSelector(mapState);

    const configUserProfile = {
        currentUser
    }

    return (
        <div className="userNav">

            <UserProfile {...configUserProfile} />

            <div className="menu">
                {children}
            </div>
        </div>
    );
}

export default UserNav;