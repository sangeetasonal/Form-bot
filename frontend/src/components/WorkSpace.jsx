import React, { useState, useEffect } from 'react';
import button from "../assets/Background+Border.png";
import button1 from "../assets/Background+Border (1).png";
import button2 from "../assets/Background+Border (2).png";
import button3 from "../assets/Background+Border (3).png";
import button4 from "../assets/Background+Border (4).png";
import button5 from "../assets/Background+Border (5).png";
import button6 from "../assets/Background+Border (6).png";
import button7 from "../assets/Background+Border (7).png";
import button8 from "../assets/Background+Border (8).png";
import button9 from "../assets/Background+Border (9).png";
import button10 from "../assets/Background+Border (10).png";
import deleteicon from  "../assets/delete.png";
import close from "../assets/close.png";
import flag from "../assets/flag.png";
import msg from "../assets/chat_bubble.png"
import './WorkSpace.css';

const WorkSpace = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [containers, setContainers] = useState([]); // State to hold the containers

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  // Effect to retrieve theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  // Handle button clicks to add different types of containers
  const handleButtonClick = (type) => {
    setContainers(prev => [
      ...prev, 
      { id: Date.now(), type: type, value: '' }
    ]);
  };

  // Handle input change inside a container
  const handleInputChange = (id, e) => {
    const updatedContainers = containers.map(container => {
      if (container.id === id) {
        return { ...container, value: e.target.value };
      }
      return container;
    });
    setContainers(updatedContainers);
  };

  // Handle delete container
  const handleDelete = (id) => {
    const updatedContainers = containers.filter(container => container.id !== id);
    setContainers(updatedContainers);
  };

  return (
    <div className={`workspace-component ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="workspace-header">
        <input type="text" placeholder="Enter Form Name" className="form-name" />
        <div className="nav-btn">
          <button>flow</button>
          <button>Response</button>
        </div>
        <div className="nav-toogle">
          <span className="light-text">Light</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
          <span className={`mode-text ${isDarkMode ? "dark" : "light"}`}>
            <span className="dark-text">Dark</span>
          </span>
        </div>
        <div className="header-controls">
          <button className="share">Share</button>
          <button className="save">Save</button>
          <button className="close"><img src={close} alt="" /></button>
        </div>
      </header>
      <main className="workspace-main">
        <aside className="toolbox">
          <div className="tool-section">
            <h3>Bubbles</h3>
            <div className="button-row">
              <button onClick={() => handleButtonClick('text')}><img src={button} alt="" /></button>
              <button onClick={() => handleButtonClick('img')}><img src={button1} alt="" /></button>
            </div>

            <div className="button-row">
              <button onClick={() => handleButtonClick('video')}><img src={button2} alt="" /></button>
              <button onClick={() => handleButtonClick('gif')}><img src={button3} alt="" /></button>
            </div>
          </div>
          <div className="tool-section">
            <h3>Inputs</h3>
            <div className="button-row">
              <button onClick={() => handleButtonClick('input-text')}><img src={button4} alt="" /></button>
              <button onClick={() => handleButtonClick('input-number')}><img src={button5} alt="" /></button>
            </div>

            <div className="button-row">
              <button onClick={() => handleButtonClick('input-email')}><img src={button6} alt="" /></button>
              <button onClick={() => handleButtonClick('input-phone')}><img src={button7} alt="" /></button>
            </div>

            <div className="button-row">
              <button onClick={() => handleButtonClick('input-date')}><img src={button8} alt="" /></button>
              <button onClick={() => handleButtonClick('input-rating')}><img src={button9} alt="" /></button>
            </div>

            <div className="button-row">
              <button onClick={() => handleButtonClick('input-button')}><img src={button10} alt="" /></button>
            </div>
          </div>
        </aside>
        <section className="canvas">
          <div className="start-node">
            <img src={flag} alt="" className="flag" /> Start
          </div>
          

          {/* Render all containers dynamically */}
          <div className="containers">
         
            {containers.map(container => (
              <div key={container.id} className="container">
                 
                {container.type === 'text' && (
                  <div className="text-container">
                  <h1>Text</h1>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <img src={msg} alt="icon" />
                    </span>
                    <input
                      type="text"
                      value={container.value}
                      onChange={(e) => handleInputChange(container.id, e)}
                      placeholder="Click here to edit"
                    />
                  </div>
                </div>
                
                )}
                {container.type === 'img' && (
                  <div className="img-container">
                    <h1>Image Container</h1>
                    <img src={button1} alt="Image" />
                  </div>
                )}
                {container.type === 'video' && (
                  <div className="video-container">
                    <h1>Video Container</h1>
                    <video controls width="300">
                      <source src="path_to_video.mp4" type="video/mp4" />
                    </video>
                  </div>
                )}
                {container.type === 'gif' && (
                  <div className="gif-container">
                    <h1>GIF Container</h1>
                    <img src="path_to_gif.gif" alt="GIF" />
                  </div>
                )}
                {container.type === 'input-text' && (
                  <div className="input-text-container">
                    <h1>Input Text</h1>
                    <input
                      type="text"
                      value={container.value}
                      onChange={(e) => handleInputChange(container.id, e)}
                      placeholder="Enter text"
                    />
                  </div>
                )}
                {container.type === 'input-number' && (
                  <div className="input-number-container">
                    <h1>Input Number</h1>
                    <input
                      type="number"
                      value={container.value}
                      onChange={(e) => handleInputChange(container.id, e)}
                      placeholder="Enter number"
                    />
                  </div>
                )}
                {container.type === 'input-email' && (
                  <div className="input-email-container">
                    <h1>Input Email</h1>
                    <input
                      type="email"
                      value={container.value}
                      onChange={(e) => handleInputChange(container.id, e)}
                      placeholder="Enter email"
                    />
                  </div>
                )}
                {container.type === 'input-phone' && (
                  <div className="input-phone-container">
                    <h1>Input Phone</h1>
                    <input
                      type="tel"
                      value={container.value}
                      onChange={(e) => handleInputChange(container.id, e)}
                      placeholder="Enter phone number"
                    />
                  </div>
                )}
                {container.type === 'input-date' && (
                  <div className="input-date-container">
                    <h1>Input Date</h1>
                    <input
                      type="date"
                      value={container.value}
                      onChange={(e) => handleInputChange(container.id, e)}
                    />
                  </div>
                )}
                {container.type === 'input-rating' && (
                  <div className="input-rating-container">
                    <h1>Input Rating</h1>
                    <input
                      type="number"
                      value={container.value}
                      onChange={(e) => handleInputChange(container.id, e)}
                      placeholder="Rate out of 5"
                    />
                  </div>
                )}
                {container.type === 'input-button' && (
                  <div className="input-button-container">
                    <h1>Input Button</h1>
                    <button>{container.value || "Click Me"}</button>
                  </div>
                  
                )}
               <button onClick={() => handleDelete(container.id)} className="delete-button">
                  <img src={deleteicon} alt="" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkSpace;
