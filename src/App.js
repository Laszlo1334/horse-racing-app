import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserBetsPage from './components/UserBetsPage';
import AdminBetsPage from './components/AdminBetsPage';
import UserHistoryPage from './components/UserHistoryPage';
import AdminHistoryPage from './components/AdminHistoryPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ubets" element={<UserBetsPage />} />
        <Route path="/abets" element={<AdminBetsPage />} />
        <Route path="/uhistory" element={<UserHistoryPage />} />
        <Route path="/ahistory" element={<AdminHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
