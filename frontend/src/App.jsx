import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import SignUp from './pages/signUp'; // Ensure the path matches the file location
import LogIn from './pages/LogIn'; 


function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
          <Route path="/signup" element={<SignUp />} /> Sign-Up Page
          <Route path="/login" element={<LogIn />} /> {/* Sign-Up Page */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
