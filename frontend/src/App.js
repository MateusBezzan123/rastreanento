import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserInfo from './components/UserInfo';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';  // Import the CSS file for styling

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <h1>Vehicle Tracking Platform</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userinfo" element={<ProtectedRoute element={UserInfo} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
