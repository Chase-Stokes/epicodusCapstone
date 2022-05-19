import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, signInWithGoogle, resetAllAuth } from '../../redux/User/user.actions';
import './styles.scss';
import Input from './../Forms/Input';
import Buttons from './../Forms/Button';
import FormWrapper from './../FormWrapper/index';
// import { signInWithGoogle } from './../../firebase/utility';
import { withRouter } from "../../hooks";

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});



const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState)

    useEffect(() => {
        if (currentUser) {
            resetFields();
            // dispatch(resetAllAuth());
            navigate('/');
        }
    }, [currentUser])
    
    const resetFields = () => {
        setEmail('');
        setPassword('');
    }
    
    const handleGoogle = () => {
        dispatch(signInWithGoogle());
    }

    const handleSubmission = event => {
        event.preventDefault();
        dispatch(emailSignInStart({email, password}));
    }
    
    
    const configureFormWrap = {
        head: 'Log In'
    };

    return (
        <FormWrapper {...configureFormWrap}>
            <div className="formWrap">
                <form onSubmit={handleSubmission}>
                    <Input type="email" name="email" value={email} placeholder="Email" handleChange={ event => setEmail(event.target.value)} />
                    <Input type="password" name="password" value={password} placeholder="PassWord" handleChange={ event => setPassword(event.target.value)} />
                    <Buttons type="submit">Log In</Buttons>
                    <div className="googleSignIn">
                        <div className="row">
                            <Buttons onClick={handleGoogle} >
                                Google Sign In
                            </Buttons>
                        </div>
                    </div>
                    <div className='link'>
                        <Link to='/recovery'>Recovery Password</Link>
                    </div>
                </form>
            </div>
        </FormWrapper>
    );
};

export default withRouter(SignIn);