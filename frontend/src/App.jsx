import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

import LandingPage from "./pages/LandingPage";
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import DashBoard from "./components/DashBoard";
import Settings from "./pages/Settings";
import WorkSpace from './components/WorkSpace';
import ResponsePage from './components/ResponsePage';
import SharedPage from './components/SharedPage'; // Make sure to import SharedPage

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workspace" element={<WorkSpace />} />
          <Route path="/response" element={<ResponsePage />} />
          <Route path="/sharedPage" element={<SharedPage />} />


        </Routes>
        {/* ToastContainer should be outside of Routes */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
      </div>
    </Router>
  );
}

export default App;
