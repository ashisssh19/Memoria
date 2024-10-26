import React, { useState, useRef } from 'react';
import './photo.css'; // Import CSS file

function Video() {
  const [showModal, setShowModal] = useState(false);
  const [textColor, setTextColor] = useState('#000000'); // Default text color
  const canvasRef = useRef(null); // Ref for canvas element

  const showTemplateOptions = () => setShowModal(true);
  const hideTemplateOptions = () => setShowModal(false);

  const uploadVideo = (event) => {
    const file = event.target.files[0];
    const video = document.createElement('video');
    const reader = new FileReader();

    reader.onload = function(event) {
      video.src = event.target.result;
      video.onloadedmetadata = function() {
        const canvas = canvasRef.current; // Access canvas using ref
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw video on canvas
      };
    };

    reader.readAsDataURL(file);
  };

  const addDateTime = () => {
    const dateTime = document.getElementById('dateTimeInput').value;
    const canvas = canvasRef.current; // Access canvas using ref
    const ctx = canvas.getContext('2d');
    
    // Adjust font size based on canvas DPI for better quality
    const dpi = window.devicePixelRatio || 1;
    const fontSize = 16 * dpi; // Set font size in points
    
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = textColor; // Set text color
    ctx.fillText(dateTime, 10, canvas.height - 10); // Adjust position to place below the video
  };

  const handleColorChange = (event) => {
    setTextColor(event.target.value); // Update text color state
  };

  return (
    <div className="video-container">
      <div className="sidebar">
        <input type="file" accept="video/*" onChange={uploadVideo} />
        <input type="datetime-local" id="dateTimeInput" />
        <input type="color" id="colorPicker" value={textColor} onChange={handleColorChange} />
        <button onClick={addDateTime}>Add Date and Time</button>
      </div>
      <div className="canvas-container">
        <canvas ref={canvasRef} id="canvas"></canvas>
      </div>
    </div>
  );
}

export default Video;
