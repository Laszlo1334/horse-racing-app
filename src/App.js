import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserBetsPage from './components/UserBetsPage';
import AdminBetsPage from './components/AdminBetsPage';
import UserHistoryPage from './components/UserHistoryPage';
import AdminHistoryPage from './components/AdminHistoryPage';
import './styles/App.css';

function AppRoutes({ appUser, isAuthenticated, isLoading }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated && appUser?.role) {
      if (
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/register'
      ) {
        if (appUser.role === 'admin') {
          navigate('/abets', { replace: true });
        } else if (appUser.role === 'user') {
          navigate('/', { replace: true });
        }
      }
    }
  }, [isLoading, isAuthenticated, appUser, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<UserBetsPage user={appUser} />} />
      <Route path="/abets" element={<AdminBetsPage user={appUser} />} />
      <Route path="/uhistory" element={<UserHistoryPage user={appUser} />} />
      <Route path="/ahistory" element={<AdminHistoryPage user={appUser} />} />
    </Routes>
  );
}

function AppContent() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const appUser = user
    ? {
        username: user.name,
        role: user["https://myapp.example.com/roles"]
          ? user["https://myapp.example.com/roles"][0]
          : null,
        email: user.email
      }
    : null;

  return (
    <Router>
      <AppRoutes appUser={appUser} isAuthenticated={isAuthenticated} isLoading={isLoading} />
    </Router>
  );
}

function App() {
  const domain = "dev-dxdypdfdh3k26fq0.us.auth0.com";
  const clientId = "4cA9PAiQ5jcla7hnA8gK7PLlA9h8YQn4";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `https://${domain}/api/v2/`,
        scope: "openid profile email"
      }}
    >
      <AppContent />
    </Auth0Provider>
  );
}

export default App;
