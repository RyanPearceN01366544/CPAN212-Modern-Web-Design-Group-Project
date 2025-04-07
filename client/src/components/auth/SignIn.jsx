import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import authService from '../../services/auth.service';
import './Auth.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log('Attempting login with:', formData);

    try {
      const response = await authService.login(formData.login, formData.password);
      console.log('Login response:', response);
      // Force reload the page to update the navbar
      window.location.href = '/';
    } catch (err) {
      console.log('Login error details:', err);
      setError(err.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      // Get user info from Google
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      
      if (!userInfoResponse.ok) {
        throw new Error('Failed to get user info');
      }

      const userInfo = await userInfoResponse.json();
      
      // Here you would typically:
      // 1. Send this token to your backend
      // 2. Create/update user in your database
      // 3. Get a session token from your backend
      // 4. Store the session token in localStorage
      
      console.log('Google user info:', userInfo);
      
      // For now, just store the basic info
      localStorage.setItem('user', JSON.stringify({
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture
      }));

      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error('Google sign in error:', err);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      setError('Failed to sign in with Google. Please try again.');
    },
    flow: 'implicit',
    scope: 'email profile'
  });

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="text"
                name="login"
                placeholder="Email or Username"
                value={formData.login}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>

          <button 
            type="button" 
            className="google-auth-button"
            onClick={() => login()}
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
