import React, { Component } from "react";
import './styles.scss';
import Input from './../Forms/Input';
import Buttons from './../Forms/Button';
import { signInWithGoogle } from './../../firebase/utility';

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
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="signin">
                <div className='wrap'>
                    <h2>Log In</h2>
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
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default SignIn;