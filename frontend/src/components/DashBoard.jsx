import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";
import createfolder from "../assets/createfolder.png";
import createtypebot from "../assets/createtypebot.png";

const API_URL = "http://localhost:5000";

const DashBoard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState("");
  const [folders, setFolders] = useState([]); // State for folders
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [newFolderName, setNewFolderName] = useState(""); // State for folder name
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const user = await response.json();
            setUsername(user.name);
          }
        } catch (err) {
          console.error("Error fetching user details:", err);
        }
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreateFolder = () => {
    setShowPopup(true); // Show popup for creating folder
  };

  const handleDone = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, newFolderName]); // Add new folder to the list
      setNewFolderName(""); // Reset folder name input
      setShowPopup(false); // Hide popup
    }
  };

  const handleCancel = () => {
    setNewFolderName(""); // Reset folder name input
    setShowPopup(false); // Hide popup
  };

  return (
    <div className={`dashboard ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <nav className="Navbar">
        <div className="workspace">{username}'s workspace</div>
        <div className="nav-actions">
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
        <button className="share-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="content">
        <div className="folder-list">
          {folders.map((folder, index) => (
            <div key={index} className="folder-item">
              {folder}
            </div>
          ))}
        </div>
        <button className="create-folder" onClick={handleCreateFolder}>
          <img src={createfolder} alt="Create Folder" className="button-icon" />
        </button>
        <div className="create-typebot">
          <img
            src={createtypebot}
            alt="Create Typebot"
            className="typebot-icon"
          />
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Create New Folder</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
            <div className="popup-actions">
              <button onClick={handleDone} className="done-btn">
                Done
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
