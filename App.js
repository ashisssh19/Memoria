import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home2 from "./components/Home2";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Uploads from './components/Uploads';
import Photo from './components/Photo'; // Import the Photo component
import Video from './components/Video';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home2 />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/photo" element={<Photo />} /> {/* Corrected path for the Photo component */}
        <Route path="/video" element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
