import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import TechPass from './TechPass';
import PrivateRoute from './PrivateRoute';
import { useTokenRefresher } from './apiClient';

function App() {
  useTokenRefresher();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/techpass"
          element={
            <PrivateRoute>
              <TechPass />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TechPass />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;