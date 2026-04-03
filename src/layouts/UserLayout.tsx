import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RiLogoutBoxRLine, RiShieldLine, RiShoppingBag3Line } from 'react-icons/ri';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/cart/CartContext';
import '../styles/UserHome.css';

const UserLayout: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await signOut();
    navigate('/user/login');
  }, [navigate, signOut]);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();

  return (
    <div className="user-layout">
      <header className="user-header">
        <div className="user-header-brand">
          <RiShieldLine className="user-header-icon" />
          <span>Cody</span>
        </div>
        <div className="user-header-right">
          <div className="user-cart-pill">
            <RiShoppingBag3Line />
            <span>{itemCount}</span>
          </div>
          {profile && <div className="user-header-avatar">{getInitials(profile.name)}</div>}
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
