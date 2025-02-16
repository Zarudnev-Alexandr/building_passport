import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchWithToken } from '../apiClient';
import config from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    profile: null,
  });


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setAuth(prev => ({ ...prev, isAuthenticated: true }));
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    try {
      const data = await fetchWithToken(`${config.apiUrl}/user/profile/`);
      if (data && data.length > 0) {
        setAuth(prev => ({ ...prev, profile: data[0] }));
      }
    } catch (error) {
      console.error("Ошибка при получении профиля:", error);
    }
  };

  const login = async (access, refresh) => {
    Cookies.set('token', access, { expires: 3650 });
    Cookies.set('refresh_token', refresh, { expires: 3650 });
    setAuth(prev => ({ ...prev, isAuthenticated: true }));
    await getProfile();
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('refresh_token');
    setAuth({ isAuthenticated: false, profile: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
