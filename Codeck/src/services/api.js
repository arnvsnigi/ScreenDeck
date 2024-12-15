// require('dotenv').config();
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    signup: async (userData) => {
        try {
            const response = await api.post('/users/signup', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred during signup' };
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/users/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred during login' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export const meetingService = {
    createMeeting: async (userId, meetingData) => {
        try {
            const response = await api.post(`/users/${userId}/meetings`, meetingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error creating meeting' };
        }
    },

    getUserMeetings: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/meetings`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching meetings' };
        }
    }
};

export default api;
