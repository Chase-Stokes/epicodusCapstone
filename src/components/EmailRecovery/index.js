import React, { useState } from "react"; 
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { withRouter } from "../../hooks";
import './styles.scss';

import FormWrapper from './../FormWrapper/index';
import Input from './../Forms/Input';
import Button from './../Forms/Button';
import { auth } from './../../firebase/utility';


// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return (
//             <Component
//             {...props}
//             router={{ location, navigate, params }}
//             />
//         );
//     } 
//     return ComponentWithRouterProp;   
// }

const EmailRecovery = props => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const config = { // this is where the recovery email sends you after they reset their password
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                navigate('/login');
            }).catch(() => {
                const error = ['Email not found.']
                setErrors(error)
            })
        } catch(error){
            // console.log(error);
        }
        setErrors([]);
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