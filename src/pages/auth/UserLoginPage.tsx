import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckLine,
  RiShieldCheckLine,
  RiUserHeartLine,
} from 'react-icons/ri';
import AvatarImg from '../../assets/avatar/Avatar.png';
import '../../styles/Auth.css';

const UserLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No logic — UI template only
  };

  return (
    <div className="auth-page">
      {/* Left Decorative Panel */}
      <div className="auth-decoration">
        <div className="auth-deco-content">
          <div className="auth-deco-avatar">
            <img src={AvatarImg} alt="Cody" />
          </div>
          <h2 className="auth-deco-title">
            Welcome to <span>Cody</span>
          </h2>
          <p className="auth-deco-text">
            Sign in to access your account and explore all the features available to you.
          </p>

          <div className="auth-deco-features">
            <div className="auth-deco-feature">
              <div className="auth-deco-feature-icon"><RiUserHeartLine /></div>
              Personalized user experience
            </div>
            <div className="auth-deco-feature">
              <div className="auth-deco-feature-icon"><RiShieldCheckLine /></div>
              Secure account protection
            </div>
            <div className="auth-deco-feature">
              <div className="auth-deco-feature-icon"><RiCheckLine /></div>
              Easy and fast access
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>User Sign In</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <Form className="auth-form" onSubmit={handleSubmit} id="user-login-form">
            <div className="form-group">
              <Form.Label>Email Address</Form.Label>
              <div className="input-icon-wrapper">
                <RiMailLine className="input-icon" />
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  className="has-icon"
                  id="user-login-email"
                />
              </div>
            </div>

            <div className="form-group">
              <Form.Label>Password</Form.Label>
              <div className="input-icon-wrapper">
                <RiLockLine className="input-icon" />
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="has-icon"
                  id="user-login-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            <div className="auth-form-options">
              <Form.Check
                type="checkbox"
                label="Remember me"
                id="user-remember-me"
              />
              <a href="#forgot">Forgot password?</a>
            </div>

            <Button type="submit" className="btn-primary auth-submit-btn" id="user-login-submit-btn">
              Sign In
            </Button>
          </Form>

          <div className="auth-footer">
            Don't have an account?
            <Link to="/user/signup">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
