import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import './Auth.css';
import authService from '../../services/auth.service';

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => { // R: Basic check for email to send with the token for the backend.
    handleGetEmail();
  }, [])

  const handleGetEmail = async() => {
    try{
      const fptPromise_ = await fetch(`http://localhost:8000/User/GetForgetPasswordToken`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const fptData_ = await fptPromise_.json();      
      if (!fptPromise_.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      if (fptData_ && fptData_.email){
        setEmail(fptData_.email);
      }
      else{
        setError("Your password reset request has been rejected. Click on the newest email password reset to reset properly.");
        setIsSuccess(false);
      }
    }
    catch (err_) {
      console.log(err_);
      setError("Your password reset request has expired.");
      setIsSuccess(false);
    }
  }

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/User/ResetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email,
          newPassword: passwords.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setIsSuccess(true);
      setTimeout(() => {    
        handleAutoLogin();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoLogin = async() => {
    const response = await authService.login(email, passwords.password);
    console.log('Login response:', response);
    navigate('/');
  }

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Password Reset Successful</h2>
          <p className="success-message">
            Your password has been reset successfully. You will be redirected to the sign in page shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password ({email ? email : "Loading..."})</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={passwords.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
