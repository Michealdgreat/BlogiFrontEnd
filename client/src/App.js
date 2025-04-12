import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Articles from "./pages/Articles";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
            <Route path="/articles" element={<Articles />} />
        </Routes>
      </Router>
  );
}

export default App;