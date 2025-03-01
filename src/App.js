import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main';
import Platfornpage from './pages/AboutPlatform';
import TechPass from './TechPass';
import LoginPage from './Login';
import Header from './components/Header';
import PrivateRoute from './PrivateRoute';
import { useTokenRefresher } from './apiClient';
import { AuthProvider } from './context/AuthContext';
import './css/style.scss';

function App() {
  useTokenRefresher();

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<Platfornpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/techpass"
            element={
              <PrivateRoute>
                <TechPass />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
