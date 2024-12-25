import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";
import createfolder from "../assets/SVG.png";
import createtypebot from "../assets/plus.png";
import deleteicon from "../assets/delete.png";
import closeicon from "../assets/close.png";
import dropdown from "../assets/drop-down.png";

const API_URL = "http://localhost:5000";

const DashBoard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState("");
  const [folders, setFolders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false);  // State for share popup
  const [email, setEmail] = useState(""); // Email for invite
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // For dropdown visibility
 const [selectedOption, setSelectedOption] = useState("Edit"); // For selected dropdown option
 const [typeBots, setTypeBots] = useState([]); // State to manage Typebots
 const [showTypeBotDeletePopup, setShowTypeBotDeletePopup] = useState(false); // Delete confirmation for Typebot
 const [typeBotToDelete, setTypeBotToDelete] = useState(null);


  useEffect(() => {
    const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    setFolders(savedFolders);

    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.ok && res.json())
        .then((user) => setUsername(user.name))
        .catch((err) => console.error("Error fetching user details:", err));
    }

    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  const handleCreateFolder = () => setShowPopup(true);

  const handleDone = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, newFolderName]);
      setNewFolderName("");
      setShowPopup(false);
    }
  };

  const handleCancel = () => {
    setNewFolderName("");
    setShowPopup(false);
  };

  const handleDeleteFolder = (index) => {
    setFolderToDelete(index);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setFolders(folders.filter((_, i) => i !== folderToDelete));
    setShowDeleteConfirmation(false);
    setFolderToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setFolderToDelete(null);
  };

  const handleSelectFolder = (index) => {
    setSelectedFolderIndex(index);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  
  
  const handleShare = () => setShowSharePopup(true); // Show Share Popup

  const handleSendInvite = () => {
    // Logic to send invite by email (e.g., API call)
    alert(`Invite sent to ${email}`);
    setEmail(""); // Reset email field
    setShowSharePopup(false); // Close the Share Popup
  };

  const handleCopyLink = () => {
    const link = window.location.href; // Get current page URL
    navigator.clipboard.writeText(link); // Copy the link to clipboard
    alert("Link copied to clipboard!");
  };
 
  const handleCreateTypeBot = () => {
    setTypeBots([...typeBots, { id: Date.now(), name: "New Form" }]);
  };

  const handleDeleteTypeBot = (id) => {
    setTypeBotToDelete(id);
    setShowTypeBotDeletePopup(true);
  };

  const confirmTypeBotDelete = () => {
    setTypeBots(typeBots.filter((bot) => bot.id !== typeBotToDelete));
    setShowTypeBotDeletePopup(false);
    setTypeBotToDelete(null);
  };

  const cancelTypeBotDelete = () => {
    setShowTypeBotDeletePopup(false);
    setTypeBotToDelete(null);
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
        <button className="share-btn" onClick={handleShare}>
          Share
        </button>
      </nav>

      <div className="content">
        <div className="folder-container">
          <button className="create-folder" onClick={handleCreateFolder}>
            <img src={createfolder} alt="Create Folder" className="folder-icon" />
            Create a folder

          </button>
          <div className="folder-list">
            {folders.map((folder, index) => (
              <div
                key={index}
                className={`folder-item ${selectedFolderIndex === index ? "selected" : ""}`}
                onClick={() => handleSelectFolder(index)}
              >
                <span className="folder-text">{folder}</span>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFolder(index);
                  }}
                >
                  <img src={deleteicon} alt="delete" className="delete-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
         <div className="typebot-wrapper">
          
        <button className="create-typebot" onClick={handleCreateTypeBot}>
          <img src={createtypebot} alt="Create Typebot" className="typebot-icon" />
          <span className="typebot-text">Create a typebot</span>
        </button>
        <div className="typebot-container">
          
          {typeBots.map((bot) => (
            
            <div key={bot.id} className="typebot-item">
              
              <span>New form</span>
              <div className="delete">
              <button className="delete-typebot" onClick={() => handleDeleteTypeBot(bot.id)}>
                <img src={deleteicon} alt="delete" className="delete-icon" />
              </button>
              </div>
            </div>
            
          ))}
         
        </div>
      </div>
      </div>
      {/* Typebot Delete Confirmation Popup */}
      {showTypeBotDeletePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Are you sure you want to delete this typebot?</h3>
            <div className="popup-actions">
              <button onClick={confirmTypeBotDelete} className="done-btn">
                Done
              </button>
              <div className="line"></div>
              <button onClick={cancelTypeBotDelete} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Popup */}
      {showSharePopup && (
  <div className="popup-overlay">
    <div className="popup-share">
      <div className="actions">
        <button onClick={() => setShowSharePopup(false)} className="close-btn">
          <img src={closeicon} alt="close" className="close-btn" />
        </button>
      </div>

      <div className="invite-by-email">
        <div className="email-header">
          <h2>Invite by Email</h2>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {selectedOption}
              <span className="arrow-icon">
                <img src={dropdown} alt="" />
              </span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleOptionSelect("Edit")}>Edit</button>
                <div className="shareline"></div>
                <button onClick={() => handleOptionSelect("View")}>View</button>
              </div>
            )}
          </div>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email id"
        />
        <button onClick={handleSendInvite} className="invite-btn">
          Send Invite
        </button>
      </div>

      <div className="invite-by-link">
        <h2>Invite by Link</h2>
        <button onClick={handleCopyLink} className="copylink-btn">
          Copy Link
        </button>
      </div>
    </div>
  </div>
)}
      {/* Folder Creation Popup */}
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
              <div className="line"></div>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="popup-overlay">
          <div className="popup-dlt">
            <h3>Are you sure you want to delete this folder?</h3>
            <div className="popup-actions">
              <button onClick={handleConfirmDelete} className="done-btn">
                Confirm
              </button>
              <div className="line"></div>
              <button onClick={handleCancelDelete} className="cancel-btn">
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
