import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useAuth = () => {
    const { currentUser } = useSelector(mapState);
    const navigate = useNavigate();
    useEffect(() => {
        if(!currentUser){
            navigate('/login');
        }
    }, [currentUser])
    return currentUser;
};

export default useAuth;