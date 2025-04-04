import axios from 'axios';

const API_URL = 'http://localhost:8000';

const authService = {
    login: async (login, password) => {
        try {
            const response = await axios.post(`${API_URL}/User/Login/`, {
                login,
                password
            });
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/User/Register/`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Registration failed' };
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    // Add token to all requests
    setupAxiosInterceptors: () => {
        axios.interceptors.request.use(
            (config) => {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};

export default authService;
