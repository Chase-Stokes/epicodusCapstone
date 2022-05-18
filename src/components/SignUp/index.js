import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, resetAllAuth } from '../../redux/User/user.actions';
import { withRouter } from "../../hooks";
import './styles.scss';

// import {auth, handleUserProfile} from './../../firebase/utility';

import Input from './../Forms/Input';
import Button from './../Forms/Button';
import FormWrapper from './../FormWrapper/index';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const SignUp = props => {
    const { signUpSuccess, signUpError} = useSelector(mapState)
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(signUpSuccess) {
            resetState();
            dispatch(resetAllAuth());
            navigate('/')
        }
    }, [signUpSuccess]);

    useEffect(() => {
        if(Array.isArray(signUpError) && signUpError.length > 0){
            setError(signUpError)
        }
    }, [signUpError]);

    const resetState = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError([]);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUser({displayName, email, password, confirmPassword}))
    }

    const configureFormWrap = {
        head: 'Register'
    };

    return (
        <FormWrapper {...configureFormWrap}>
            <div className='formWrap'>
                <form onSubmit={handleFormSubmit}>
                    {error.length > 0 && (
                        <ul>
                            {error.map((err, index) => {
                                return (
                                    <li key={index}>{err}</li>
                                )
                            })}
                        </ul>
                    )}
                    <Input type='text' name='displayName' value={displayName} placeholder='Name'  handleChange={event => setDisplayName(event.target.value)} />
                    <Input type='email' name='email' value={email} placeholder='Email'  handleChange={event => setEmail(event.target.value)} />
                    <Input type='password' name='password' value={password} placeholder='Password'  handleChange={event => setPassword(event.target.value)} />
                    <Input type='password' name='confirmPassword' value={confirmPassword} placeholder='Confirm Password'  handleChange={event => setConfirmPassword(event.target.value)} />
                    <Button type='submit' >
                        Register
                    </Button>
                </form>
            </div>
        </FormWrapper>
    )
}

export default withRouter(SignUp);