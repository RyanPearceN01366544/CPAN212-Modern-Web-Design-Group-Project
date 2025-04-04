import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on page load
        const user = authService.getCurrentUser();
        if (user) {
            setUser(user);
        }
        setLoading(false);
        
        // Setup axios interceptors for authentication
        authService.setupAxiosInterceptors();
    }, []);

    const login = async (login, password) => {
        const userData = await authService.login(login, password);
        setUser(userData);
        return userData;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const register = async (userData) => {
        const result = await authService.register(userData);
        return result;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
