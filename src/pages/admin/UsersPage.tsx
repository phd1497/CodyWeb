import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import {
  RiGroupLine,
  RiUserFollowLine,
  RiShieldUserLine,
  RiAlertLine,
  RiSearchLine,
  RiAddLine,
  RiEyeLine,
  RiDeleteBinLine,
  RiFilterLine,
} from 'react-icons/ri';
import { User } from '../../types';
import { mockUsers } from '../../assets/mockData';
import UserDetailModal from '../../components/UserDetailModal';
import '../../styles/Users.css';

const UsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowClick = (user: User) => {
    setSelectedRowId(user.id);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleViewClick = (e: React.MouseEvent, user: User) => {
    e.stopPropagation();
    setSelectedRowId(user.id);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setSelectedRowId(null);
  };

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const getAvatarGradient = (id: number) => {
    const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];
    return gradients[(id - 1) % gradients.length];
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'role-badge admin';
      case 'moderator': return 'role-badge moderator';
      default: return 'role-badge user';
    }
  };

  // Stats
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter((u) => u.status === 'Active').length;
  const adminCount = mockUsers.filter((u) => u.role === 'admin').length;
  const inactiveUsers = mockUsers.filter((u) => u.status === 'Inactive').length;

  return (
    <div className="users-page">
      {/* Page Header */}
      <div className="users-page-header">
        <div>
          <h1 className="users-page-title">User Management</h1>
          <p className="users-page-subtitle">Manage and monitor all registered users</p>
        </div>
        <div className="users-actions">
          <Button variant="outline-secondary" size="sm" id="filter-btn">
            <RiFilterLine style={{ marginRight: '0.375rem' }} />
            Filter
          </Button>
          <Button variant="primary" size="sm" id="add-user-btn">
            <RiAddLine style={{ marginRight: '0.375rem' }} />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <RiGroupLine />
          </div>
          <div className="stat-info">
            <h4>{totalUsers}</h4>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <RiUserFollowLine />
          </div>
          <div className="stat-info">
            <h4>{activeUsers}</h4>
            <p>Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <RiShieldUserLine />
          </div>
          <div className="stat-info">
            <h4>{adminCount}</h4>
            <p>Admins</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger">
            <RiAlertLine />
          </div>
          <div className="stat-info">
            <h4>{inactiveUsers}</h4>
            <p>Inactive</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-card">
        <div className="users-table-header">
          <h3 className="users-table-title">All Users</h3>
          <div className="users-table-search">
            <RiSearchLine className="users-table-search-icon" />
            <input type="text" placeholder="Search users..." id="search-users-input" />
          </div>
        </div>

        <div className="users-table-body">
          <Table hover id="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr
                  key={`user-${user.id}`}
                  className={selectedRowId === user.id ? 'selected-row' : ''}
                  onClick={() => handleRowClick(user)}
                  id={`user-row-${user.id}`}
                >
                  <td>
                    <div className="user-avatar-cell">
                      <div className={`user-avatar ${getAvatarGradient(user.id)}`}>
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div className="user-email-sub">ID: #{String(user.id).padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td>
                    <span className={getRoleBadgeClass(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className="status-indicator">
                      <span className={`status-dot ${user.status}`} />
                      {user.status === 'Active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>
                    {new Date(user.joinedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="row-action-btn view"
                        onClick={(e) => handleViewClick(e, user)}
                        title="View Details"
                        id={`view-user-${user.id}`}
                      >
                        <RiEyeLine />
                      </button>
                      <button
                        className="row-action-btn delete"
                        onClick={(e) => e.stopPropagation()}
                        title="Delete User"
                        id={`delete-user-${user.id}`}
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UsersPage;
