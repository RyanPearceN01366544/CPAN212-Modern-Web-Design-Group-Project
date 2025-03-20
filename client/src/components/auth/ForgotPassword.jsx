import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will implement actual password reset later
    setMessage('Password reset link has been sent to your email.');
    setIsSubmitted(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        {!isSubmitted ? (
          <>
            <p className="auth-description">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-icon">
                  <FaEnvelope />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="auth-button">Send Reset Link</button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>{message}</p>
            <p>Didn't receive the email? Check your spam folder or try again.</p>
          </div>
        )}
        <div className="auth-links">
          <Link to="/signin">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
