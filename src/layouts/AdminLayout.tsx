import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  RiDashboardLine,
  RiGroupLine,
  RiSearchLine,
  RiNotification3Line,
  RiMenuLine,
  RiCloseLine,
  RiShieldLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiAdminLine,
} from 'react-icons/ri';
import '../styles/AdminLayout.css';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      {/* Sidebar Overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <RiShieldLine />
          </div>
          <div className="brand-text">
            <h1>Cody</h1>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Main Menu</div>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `nav-item-link ${isActive ? 'active' : ''}`
            }
            onClick={closeSidebar}
          >
            <span className="nav-item-icon"><RiDashboardLine /></span>
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `nav-item-link ${isActive ? 'active' : ''}`
            }
            onClick={closeSidebar}
          >
            <span className="nav-item-icon"><RiGroupLine /></span>
            Users
          </NavLink>
          <NavLink
            to="/admin/management"
            className={({ isActive }) =>
              `nav-item-link ${isActive ? 'active' : ''}`
            }
            onClick={closeSidebar}
          >
            <span className="nav-item-icon"><RiAdminLine /></span>
            Admin Management
          </NavLink>

          <div className="nav-section-title">System</div>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `nav-item-link ${isActive ? 'active' : ''}`
            }
            onClick={closeSidebar}
          >
            <span className="nav-item-icon"><RiSettings4Line /></span>
            Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">CA</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Cody Admin</div>
              <div className="sidebar-user-role">Super Admin</div>
            </div>
            <RiLogoutBoxRLine style={{ color: 'var(--text-tertiary)', fontSize: '1.125rem' }} />
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="admin-main-wrapper">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              {sidebarOpen ? <RiCloseLine /> : <RiMenuLine />}
            </button>
            <div>
              <div className="header-title">Admin Panel</div>
              <div className="header-breadcrumb">
                Home <span>/</span> <span>Dashboard</span>
              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="header-search">
              <RiSearchLine className="header-search-icon" />
              <input type="text" placeholder="Search anything..." />
            </div>

            <button className="header-icon-btn" id="notifications-btn">
              <RiNotification3Line />
              <span className="notification-dot" />
            </button>

            <div className="header-avatar" id="header-user-avatar">
              CA
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
