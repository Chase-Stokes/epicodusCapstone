import React, { useState, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "../../hooks";
import { recoverPassword } from './../../redux/User/user.actions'
import './styles.scss';

import FormWrapper from './../FormWrapper/index';
import Input from './../Forms/Input';
import Button from './../Forms/Button';

const mapState = ({ user }) => ({
    resetPassword: user.resetPassword,
    resetPasswordError: user.resetPasswordError
})

const EmailRecovery = props => {

    const {resetPassword, resetPasswordError} = useSelector(mapState)
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(resetPassword){
            navigate('/login')
        }
    }, [resetPassword]);

    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError)
        }
    }, [resetPasswordError])

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(recoverPassword({ email }));
        // setErrors([]);
    }

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
                <form onSubmit={handleSubmit}>
                    <Input type='email' name='email' value={email} placeholder='Email' handleChange={event => setEmail(event.target.value)}/>
                    <Button>Submit Recovery</Button>
                </form>
            </div>
        </FormWrapper>
    )
}

export default withRouter(EmailRecovery);