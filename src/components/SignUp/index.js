import React, { Component } from 'react';
import './styles.scss';

import {auth, handleUserProfile} from './../../firebase/utility';

import Input from './../Forms/Input';
import Button from './../Forms/Button';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: []
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword, error} = this.state;
        if(password != confirmPassword) {
            const error = ['Passwords Dont Match'];
            this.setState({
                errors: error
            });
            return;
        }
    }
    render() {
        const {displayName, email, password, confirmPassword, errors} = this.state;

        return (
            <div className='signup'>
                <div className='wrap'>
                    <h2>Sign Up</h2>
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>{err}</li>
                                )
                            })}
                        </ul>
                    )}
                    <div className='formWrap'>
                        <form onSubmit={this.handleFormSubmit}>
                            <Input type='text' name='displayName' value={displayName} placeholder='Name'  onChange={this.handleChange} />
                            <Input type='email' name='email' value={email} placeholder='Email'  onChange={this.handleChange} />
                            <Input type='password' name='password' value={password} placeholder='Password'  onChange={this.handleChange} />
                            <Input type='password' name='confirmPassword' value={confirmPassword} placeholder='Confirm Password'  onChange={this.handleChange} />
                            <Button type='submit' >
                                Register
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;