import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './styles.scss';
import Input from './../Forms/Input';
import Buttons from './../Forms/Button';
import FormWrapper from './../FormWrapper/index';
import { signInWithGoogle, auth } from './../../firebase/utility';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetFields = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmission = async event => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetFields();
        } catch(error) {
            console.log(error)
        }
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
                            <Buttons onClick={signInWithGoogle}>
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

export default SignIn;