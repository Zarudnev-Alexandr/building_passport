import React, { useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import './LoginPage.css';
import config from './config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await axios.post(`${config.apiUrl}/user/token/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  
                },
            });

            const { access } = response.data;
            const { refresh } = response.data;

            await login(access, refresh);

            navigate('/');
        } catch (error) {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Вход в систему</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            placeholder="Логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default Login;