import React, { useState } from "react";
import "./logIn.css";
import { useNavigate } from "react-router-dom";
import sidetriangle from "../assets/Group 2.png";
import sidesemicircle from "../assets/Ellipse 2.png";
import bottomcircle from "../assets/Ellipse 1.png";
import googleIcon from "../assets/Google Icon.png";
import arrowBackIcon from "../assets/arrow_back.png";

const API_URL = "http://localhost:5000"; // Replace with your backend URL

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData); // Log backend error details
        setError(errorData.message || "Failed to login");
        return;
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
  
      // Store JWT token in localStorage
      localStorage.setItem("token", data.token);
  
      // Redirect after successful login
      navigate("/");
    } catch (err) {
      console.error("Network error:", err);
      setError("Something went wrong. Please try again.");
    }
  };
  
  

  return (
    <div className="login-page">
      <img
        src={arrowBackIcon}
        alt="Back"
        className="arrow-back"
        onClick={() => navigate("/")}
      />

      <div className="login-container">
        <img
          src={sidetriangle}
          alt="Decorative Triangle"
          className="decorative-triangle"
        />
        <img
          src={sidesemicircle}
          alt="Decorative Semicircle"
          className="side-circle"
        />
        <img
          src={bottomcircle}
          alt="Decorative Circle"
          className="bottom-circle"
        />

        <form className="login-form" onSubmit={handleSubmit}>
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="***********"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="form-button">
            Log In
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="or">OR</div>

        <button className="google-button">
          <img src={googleIcon} alt="Google Icon" className="google-icon" />
          Log In with Google
        </button>

        <p className="form-footer">
          Don’t have an account?{" "}
          <a href="/signup" className="form-link">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;