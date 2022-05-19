import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkIfAdmin } from './../Utility';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useAdmin = props => {
    const { currentUser } = useSelector(mapState);
    const navigate = useNavigate();
    useEffect(() => {
        if(!checkIfAdmin(currentUser)){
            navigate('/login');    
        } 
    }, [currentUser]);
    return currentUser;
}

export default useAdmin;