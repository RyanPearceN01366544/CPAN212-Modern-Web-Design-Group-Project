import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import authService from '../../services/auth.service';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
      const response = await authService.register(registrationData);
      setSuccess('Account registered successfully!');
      // Wait for 2 seconds to show success message, then redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
<<<<<<< HEAD
    } catch (err) {
      if (err.message === 'User already exists') {
        setError('Account already exists. Please try logging in.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
=======
      await authService.register(registrationData);
      navigate('/signin');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
>>>>>>> d8e3586 (Implement user authentication with MongoDB integration)
=======
    } catch (err) {
      if (err.message === 'User already exists') {
        setError('Account already exists. Please try logging in.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
      console.error('Registration error:', err);
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

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
