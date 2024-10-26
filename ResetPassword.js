import React, { useState } from 'react';
import './Page.css';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(`http://localhost:3001/auth/resetPassword/`+token, 
            { password }
        ).then(response => {
            if(response.data.status){
                navigate('/login');
            } else {
                console.log(response.data.message);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                
                <label htmlFor='password'>New Password:</label>
                <input type="password" placeholder='Password'
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                 
                <button type='submit'>Confirm</button>
            </form>
        </div>
    );
};

export default ResetPassword;
