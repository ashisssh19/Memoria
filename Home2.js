import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Import CSS file for styling

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout') // Change the endpoint to logout
    .then(res => {
      if(res.data.status) {
        navigate('/'); // Redirect to home page after logout
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div>
      {/* Header/Navbar */}
      <div className="header">
        <div className="logo">
          <img src="logo.png" alt="Logo" /> {/* Adjust the path to your logo image */}
        </div>
        <div className="nav-links">
        <Link to="/Photo">Photo</Link>
        <Link to="/Video">Video</Link>
        <Link to="/" className="nav-link">Logout</Link>
        </div>
      </div>

      {/* Body */}
      <div className="body-container">
        <div className="background-photo">
          {/* Background photo */}
        </div>
        <div className="about-us-box">
          <h2>What is Memoria?</h2>
          <p>Memoria is a service dedicated to preserving your cherished memories securely. We offer a convenient platform for users to store their captured moments with us, ensuring their safety and longevity. Our service allows users to securely upload and store their photos, videos, and other memorable content. Additionally, users can schedule email reminders to revisit these memories whenever they desire. At Memoria, we understand the value of preserving precious moments, and we're committed to providing a reliable solution for safeguarding and reliving memories for years to come. </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
