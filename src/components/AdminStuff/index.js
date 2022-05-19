import React from "react";
import './styles.scss';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { checkIfAdmin } from "../../Utility/index";

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminStuff = props => {
    const { currentUser } = useSelector(mapState);
    const ifAdmin = checkIfAdmin(currentUser);
    if (!ifAdmin) return null
    return (
        <div className='adminStuff'>
            <ul>
                <li>
                    <Link to='/admin'>
                        Admin
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminStuff;
