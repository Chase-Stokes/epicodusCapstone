import React, { Component } from "react";
import './styles.scss';
import Buttons from './../Forms/Button';
import { signInWithGoogle } from './../../firebase/utility';

class SignIn extends Component {

    handleSubmission = async event => {
        event.preventDefault();
    }
    render() {
        return (
            <div className="signin">
                <div className='wrap'>
                    <h2>Log In</h2>
                </div>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmission}>
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
        );
    }
};

export default SignIn;