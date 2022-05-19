import React, { useState, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "../../hooks";
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions'
import './styles.scss';

import FormWrapper from './../FormWrapper/index';
import Input from './../Forms/Input';
import Button from './../Forms/Button';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userError: user.userError
})

const EmailRecovery = props => {

    const {resetPasswordSuccess, userError} = useSelector(mapState)
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetUserState());
            navigate('/login')
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(userError) && userError.length > 0) {
            setErrors(userError)
        }
    }, [userError])

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(resetPasswordStart({ email }));
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