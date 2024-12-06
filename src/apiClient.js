import Cookies from 'js-cookie';
import config from './config';
import React, { useState, useEffect } from "react";

let isRefreshing = false;
let refreshSubscribers = [];


export const fetchWithToken = async (url, options = {}) => {
    let token = Cookies.get('token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, { ...options, headers });

    if (response.ok) {
        return response.json();
    }

    if (response.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true;
            await refreshToken();
            isRefreshing = false;

            refreshSubscribers.forEach(callback => callback());
            refreshSubscribers = [];
        }

        return new Promise(resolve => {
            refreshSubscribers.push(() => resolve(fetchWithToken(url, options)));
        });
    }

    console.error('Ошибка:', response.status, response.statusText);
    throw new Error(`Ошибка: ${response.statusText}`);
};

const refreshToken = async () => {
    const refresh = Cookies.get('refresh_token');

    const response = await fetch(`${config.apiUrl}/user/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
        console.error('Ошибка обновления токена:', response.status, response.statusText);
        throw new Error('Не удалось обновить токен');
    }

    const data = await response.json();
    Cookies.set('token', data.access, { expires: 3650   });
    Cookies.set('refresh_token', data.refresh, { expires: 3650   });
};

export const useTokenRefresher = () => {
    useEffect(() => {
        const intervalTime = 1000 * 60 * 4;

        const interval = setInterval(() => {
            const refresh = Cookies.get('refresh_token');
            if (refresh) {
                refreshToken();
            }
        }, intervalTime);

        return () => clearInterval(interval); 
    }, []);
};
