import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckLine,
  RiBarChartBoxLine,
  RiTeamLine,
} from 'react-icons/ri';
import { adminSignIn } from '../../services/authService';
import AvatarImg from '../../assets/avatar/Avatar.png';
import '../../styles/Auth.css';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (code: string): string => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'Something went wrong. Please try again.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      await adminSignIn(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      const errorCode = err?.code || '';
      setError(getErrorMessage(errorCode));
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
            <img src={AvatarImg} alt="Cody Admin" />
          </div>
          <h2 className="auth-deco-title">
            Welcome to <span>Cody</span>
          </h2>
          <p className="auth-deco-text">
            Welcome back. Access your system and manage everything efficiently with a clean admin dashboard.
          </p>

          <div className="auth-deco-features">
            <div className="auth-deco-feature">
              <div className="auth-deco-feature-icon"><RiBarChartBoxLine /></div>
              Real-time analytics and insights
            </div>
            <div className="auth-deco-feature">
              <div className="auth-deco-feature-icon"><RiTeamLine /></div>
              User management and roles
            </div>
            <div className="auth-deco-feature">
              <div className="auth-deco-feature-icon"><RiCheckLine /></div>
              Secure and reliable platform
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Admin Sign In</h2>
            <p>Enter your credentials to access the admin dashboard</p>
          </div>

          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setError(null)}
              className="auth-alert"
              id="admin-login-error"
            >
              {error}
            </Alert>
          )}

          <Form className="auth-form" onSubmit={handleSubmit} id="admin-login-form">
            <div className="form-group">
              <Form.Label>Email Address</Form.Label>
              <div className="input-icon-wrapper">
                <RiMailLine className="input-icon" />
                <Form.Control
                  type="email"
                  placeholder="admin@example.com"
                  className="has-icon"
                  id="admin-login-email"
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
                  placeholder="Enter your password"
                  className="has-icon"
                  id="admin-login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
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
                id="admin-remember-me"
              />
              <a href="#forgot">Forgot password?</a>
            </div>

            <Button
              type="submit"
              className="btn-primary auth-submit-btn"
              id="admin-login-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
