import axios from 'axios';

const API_URL = 'http://localhost:8000';

const authService = {
    login: async (login, password) => {
        try {
<<<<<<< HEAD
            const response = await axios.post(`${API_URL}/User/Login/`, {
=======
            const response = await axios.post(`${API_URL}/User/Login`, {
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
                login,
                password
            });
            if (response.data.token) {
<<<<<<< HEAD
                localStorage.setItem('user', JSON.stringify(response.data));
=======
                // Store both token and user data
                const userData = {
                    token: response.data.token,
                    // Parse the JWT token to get user info
                    ...JSON.parse(atob(response.data.token.split('.')[1]))
                };
                localStorage.setItem('user', JSON.stringify(userData));
                // Trigger a storage event for other components
                window.dispatchEvent(new Event('storage'));
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    register: async (userData) => {
        try {
<<<<<<< HEAD
            const response = await axios.post(`${API_URL}/User/Register/`, userData);
=======
            const response = await axios.put(`${API_URL}/User/Register`, userData);
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
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
