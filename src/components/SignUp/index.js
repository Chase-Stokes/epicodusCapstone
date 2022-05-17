import React, { useState } from 'react';
import './styles.scss';

import {auth, handleUserProfile} from './../../firebase/utility';

import Input from './../Forms/Input';
import Button from './../Forms/Button';
import FormWrapper from './../FormWrapper/index';

const SignUp = props => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([]);

    const resetState = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError([]);
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        if(password !== confirmPassword) {
            const error = ['Passwords Dont Match'];
            setError(error)
            return;
        } else if (password.length < 6) {
            const error = ['Password Must Be At Least 6 Characters'];
            this.setState({
                error: error
            });
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await handleUserProfile(user, { displayName });
            resetState();
        } catch(err) {
            console.log(err);
        }
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

export default SignUp;