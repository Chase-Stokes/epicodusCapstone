import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './styles.scss';
import Input from './../Forms/Input';
import Buttons from './../Forms/Button';
import FormWrapper from './../FormWrapper/index';
import { signInWithGoogle, auth } from './../../firebase/utility';

const initialState = {
    email: '',
    password: ''
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmission = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            })
        } catch(error) {
            console.log(error)
        }

    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { email, password } = this.state;
        const configureFormWrap = {
            head: 'Log In'
        };

        return (
            <FormWrapper {...configureFormWrap}>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmission}>
                        <Input type="email" name="email" value={email} placeholder="Email" handleChange={this.handleChange} />
                        <Input type="password" name="password" value={password} placeholder="PassWord" handleChange={this.handleChange} />
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
    }
};

export default SignIn;