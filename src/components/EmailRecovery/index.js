import React, { Component } from "react"; 
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './styles.scss';

import FormWrapper from './../FormWrapper/index';
import Input from './../Forms/Input';
import Button from './../Forms/Button';
import { auth } from './../../firebase/utility';

const initialState = {
    email: '',
    errors: []
};

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
            {...props}
            router={{ location, navigate, params }}
            />
        );
    } 
    return ComponentWithRouterProp;   
}

class EmailRecovery extends Component {
    constructor(props){
        super(props)
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

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { email } = this.state;
            const config = { // this is where the recovery email sends you after they reset their password
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                this.props.history.push('/login')
            }).catch(() => {
                const error = ['Email not found.']
                this.setState({
                    errors: error
                })
            })
        } catch(error){
            console.log(error);
        }
    }

    render () {
        const { email, errors } = this.state;
        const configFormWrapper = {
            head: 'Recover Password'
        }

        return(
            <FormWrapper {...configFormWrapper}>
                <div className='formWrap'>
                    {errors.length > 0 && 
                    <ul>
                        {errors.map((element, index) => {
                            return (
                                <li key={index}>{element}</li>
                            );
                        })}
                        </ul>}
                    <form onSubmit={this.handleSubmit}>
                        <Input type='email' name='email' value={email} placeholder='Email' onChange={this.handleChange}/>
                        <Button>Submit Recovery</Button>
                    </form>
                </div>
            </FormWrapper>
        )
    }
}

export default withRouter(EmailRecovery);