import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
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
import { registerUser } from '../../services/authService';
import AvatarImg from '../../assets/avatar/Avatar.png';
import '../../styles/Auth.css';

const UserSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getErrorMessage = (error: any): string => {
    const code = error?.code || '';
    const message = error?.message || '';

    // Firebase Auth error codes
    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      // Firestore error codes
      case 'permission-denied':
        return 'Unable to save profile data. Please contact support.';
      case 'unavailable':
        return 'Service is temporarily unavailable. Please try again later.';
      default:
        break;
    }

    // If we have a readable message from Firebase, use it
    if (message && !message.includes('Firebase')) {
      return message;
    }

    return 'Something went wrong. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) { setError('Please enter your full name.'); return; }
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!password.trim()) { setError('Please enter a password.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      await registerUser(name.trim(), email.trim(), password);
      setSuccess('🎉 Account created successfully! Redirecting to your home page...');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/user/home');
      }, 1500);
    } catch (err: any) {
      console.error('[UserSignup] Registration failed:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
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

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)} className="auth-alert">
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess(null)} className="auth-alert">
              {success}
            </Alert>
          )}

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
                <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            <Button type="submit" className="btn-primary auth-submit-btn" id="user-signup-submit-btn" disabled={loading}>
              {loading ? (
                <><Spinner animation="border" size="sm" className="me-2" />Creating Account...</>
              ) : (
                'Create Account'
              )}
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
