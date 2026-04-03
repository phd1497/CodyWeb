import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import {
  RiGroupLine,
  RiUserFollowLine,
  RiAlertLine,
  RiSearchLine,
  RiFilterLine,
  RiEyeLine,
  RiDeleteBinLine,
} from 'react-icons/ri';
import type { UserProfile } from '../../types';
import { getAllUsers } from '../../services/firestoreService';
import UserDetailModal from '../../components/UserDetailModal';
import '../../styles/Users.css';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRowClick = (user: UserProfile) => {
    setSelectedRowId(user.uid);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleViewClick = (e: React.MouseEvent, user: UserProfile) => {
    e.stopPropagation();
    setSelectedRowId(user.uid);
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

  const getAvatarGradient = (uid: string) => {
    const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];
    const hash = uid.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 'Active').length;
  const inactiveUsers = users.filter((u) => u.status === 'Inactive').length;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

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
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary"><RiGroupLine /></div>
          <div className="stat-info">
            <h4>{totalUsers}</h4>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><RiUserFollowLine /></div>
          <div className="stat-info">
            <h4>{activeUsers}</h4>
            <p>Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger"><RiAlertLine /></div>
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
          {users.length === 0 ? (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
              No users registered yet.
            </div>
          ) : (
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
                {users.map((user) => (
                  <tr
                    key={user.uid}
                    className={selectedRowId === user.uid ? 'selected-row' : ''}
                    onClick={() => handleRowClick(user)}
                    id={`user-row-${user.uid}`}
                  >
                    <td>
                      <div className="user-avatar-cell">
                        <div className={`user-avatar ${getAvatarGradient(user.uid)}`}>
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email-sub">UID: {user.uid.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                    <td>
                      <span className="role-badge user">{user.role}</span>
                    </td>
                    <td>
                      <span className="status-indicator">
                        <span className={`status-dot ${user.status}`} />
                        {user.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                        <button className="row-action-btn view" onClick={(e) => handleViewClick(e, user)} title="View Details">
                          <RiEyeLine />
                        </button>
                        <button className="row-action-btn delete" onClick={(e) => e.stopPropagation()} title="Delete User">
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      <UserDetailModal user={selectedUser} show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default UsersPage;
