import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RiLogoutBoxRLine, RiShieldLine } from 'react-icons/ri';
import { useAuth } from '../contexts/AuthContext';
import '../styles/UserHome.css';

const UserLayout: React.FC = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/user/login');
  };

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  return (
    <div className="user-layout">
      <header className="user-header">
        <div className="user-header-brand">
          <RiShieldLine className="user-header-icon" />
          <span>Cody</span>
        </div>
        <div className="user-header-right">
          {profile && (
            <div className="user-header-avatar">
              {getInitials(profile.name)}
            </div>
          )}
          <button className="user-logout-btn" onClick={handleLogout}>
            <RiLogoutBoxRLine />
            Logout
          </button>
        </div>
      </header>

      <main className="user-main">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
