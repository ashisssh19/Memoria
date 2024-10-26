import React, { useState } from 'react';
import './Page.css';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false); // State to control the visibility of the error popup

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3000/auth/login", 
            { email, password }
        ).then(response => {
            if(response.data.status){
              navigate('/Home'); // Redirect to Home2 page after successful login
            } else {
              setError("Incorrect email or password"); // Set error message for incorrect credentials
              setShowError(true); // Show the error popup
            }
        }).catch(err => {
            console.log(err);
            setError("An error occurred. Please try again."); // Set error message for other errors
            setShowError(true); // Show the error popup
        });
    };

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label htmlFor='email'>Email:</label>
                <input type="email" placeholder='Email'
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password:</label>
                <input type="password" placeholder='Password'
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Login</button>
                <Link to="/forgotPassword">Forgot password?</Link>
                <p>Don't have Account? <Link to="/signup">Sign Up</Link></p>

                {/* Error popup */}
                {showError && <div className="error-popup">{error}</div>}
            </form>
        </div>
    );
};

export default Login;
