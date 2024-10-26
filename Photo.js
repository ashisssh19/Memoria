import React, { useState, useRef } from 'react';
import './photo.css'; // Import CSS file

function Photo() {
  const [templateOptions, setTemplateOptions] = useState(["Template 1", "Template 2"]);
  const [showModal, setShowModal] = useState(false);
  const [textColor, setTextColor] = useState('#000000'); // Default text color
  const canvasRef = useRef(null); // Ref for canvas element

  const showTemplateOptions = () => setShowModal(true);
  const hideTemplateOptions = () => setShowModal(false);

  const applyTemplate = () => {
    hideTemplateOptions();
    // Apply selected template logic here
  };

  const uploadPhoto = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = canvasRef.current; // Access canvas using ref
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions to match image resolution
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0); 
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(file);
  };

  const addText = () => {
    const text = document.getElementById('textInput').value;
    const canvas = canvasRef.current; // Access canvas using ref
    const ctx = canvas.getContext('2d');
    
    // Adjust font size based on canvas DPI for better quality
    const dpi = window.devicePixelRatio || 1;
    const fontSize = 20 * dpi; // Set font size in points
    
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = textColor; // Set text color
    ctx.fillText(text, 10, canvas.height - 30); // Adjust position to place below the image
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
    ctx.fillText(dateTime, 10, canvas.height - 10); // Adjust position to place below the image
  };

  const downloadImage = () => {
    const canvas = canvasRef.current; // Access canvas using ref
    const link = document.createElement('a');
    link.download = 'edited_image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleColorChange = (event) => {
    setTextColor(event.target.value); // Update text color state
  };

  return (
    <div className="photo-container">
      <div className="sidebar">
        <button onClick={showTemplateOptions}>Choose Template</button>
        <input type="file" accept="image/*" onChange={uploadPhoto} />
        <input type="text" id="textInput" placeholder="Enter Text" />
        <input type="datetime-local" id="dateTimeInput" />
        <input type="color" id="colorPicker" value={textColor} onChange={handleColorChange} />
        <button onClick={addText}>Add Text</button>
        <button onClick={addDateTime}>Add Date and Time</button>
      </div>
      <div className="canvas-container">
        <canvas ref={canvasRef} id="canvas"></canvas>
        <div id="bottomControls">
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      </div>
      {showModal && (
        <div className="template-modal">
          <span className="close" onClick={hideTemplateOptions}>×</span>
          <h2>Choose a Template</h2>
          <select id="templateSelect">
            {templateOptions.map((option, index) => (
              <option key={index} value={option.toLowerCase().replace(/\s/g, '')}>{option}</option>
            ))}
          </select>
          <button onClick={applyTemplate}>Apply Template</button>
        </div>
      )}
    </div>
  );
}

export default Photo;
