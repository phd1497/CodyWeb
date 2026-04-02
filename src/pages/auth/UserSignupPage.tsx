import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {
  RiUserLine,
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

const UserSignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            Join <span>Cody</span>
          </h2>
          <p className="auth-deco-text">
            Create your account and get started with all the features we have to offer.
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
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>

          <Form className="auth-form" onSubmit={handleSubmit} id="user-signup-form">
            <div className="form-group">
              <Form.Label>Full Name</Form.Label>
              <div className="input-icon-wrapper">
                <RiUserLine className="input-icon" />
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  className="has-icon"
                  id="user-signup-name"
                />
              </div>
            </div>

            <div className="form-group">
              <Form.Label>Email Address</Form.Label>
              <div className="input-icon-wrapper">
                <RiMailLine className="input-icon" />
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  className="has-icon"
                  id="user-signup-email"
                />
              </div>
            </div>

            <div className="form-group">
              <Form.Label>Password</Form.Label>
              <div className="input-icon-wrapper">
                <RiLockLine className="input-icon" />
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  className="has-icon"
                  id="user-signup-password"
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

            <div className="form-group">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-icon-wrapper">
                <RiLockLine className="input-icon" />
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="has-icon"
                  id="user-signup-confirm-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <Form.Check
                type="checkbox"
                label={
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
                    I agree to the <a href="#terms" style={{ color: 'var(--color-primary-light)' }}>Terms of Service</a> and{' '}
                    <a href="#privacy" style={{ color: 'var(--color-primary-light)' }}>Privacy Policy</a>
                  </span>
                }
                id="user-agree-terms"
              />
            </div>

            <Button type="submit" className="btn-primary auth-submit-btn" id="user-signup-submit-btn">
              Create Account
            </Button>
          </Form>

          <div className="auth-footer">
            Already have an account?
            <Link to="/user/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignupPage;
