import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import {
  RiShieldUserLine,
  RiSearchLine,
  RiAddLine,
  RiEyeLine,
  RiDeleteBinLine,
  RiMailLine,
  RiLockLine,
  RiUserLine,
  RiEyeOffLine,
  RiEyeLine as RiEyeLineAlt,
} from 'react-icons/ri';
import { Admin } from '../../types';
import { mockAdmins } from '../../assets/mockData';
import '../../styles/Users.css';
import '../../styles/AdminManagement.css';

const AdminManagementPage: React.FC = () => {
  const [admins] = useState<Admin[]>(mockAdmins);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRowClick = (admin: Admin) => {
    setSelectedRowId(admin.id);
    setSelectedAdmin(admin);
    setShowDetailModal(true);
  };

  const handleViewClick = (e: React.MouseEvent, admin: Admin) => {
    e.stopPropagation();
    setSelectedRowId(admin.id);
    setSelectedAdmin(admin);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedAdmin(null);
    setSelectedRowId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddModal(false);
    // No logic — UI template only
  };

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const getAvatarGradient = (id: number) => {
    const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];
    return gradients[(id - 1) % gradients.length];
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'AdminX': return 'role-badge admin';
      case 'Admin': return 'role-badge admin';
      case 'Moderator': return 'role-badge moderator';
      default: return 'role-badge user';
    }
  };

  const formatRole = (role: string) => {
    return role;
  };

  // Stats
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter((a) => a.status === 'Active').length;
  const superAdmins = admins.filter((a) => a.role === 'AdminX').length;

  return (
    <div className="admin-mgmt-page">
      {/* Page Header */}
      <div className="users-page-header">
        <div>
          <h1 className="users-page-title">Admin Management</h1>
          <p className="users-page-subtitle">Manage administrator accounts and permissions</p>
        </div>
        <div className="users-actions">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            id="add-admin-btn"
          >
            <RiAddLine style={{ marginRight: '0.375rem' }} />
            Add Admin
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <RiShieldUserLine />
          </div>
          <div className="stat-info">
            <h4>{totalAdmins}</h4>
            <p>Total Admins</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <RiShieldUserLine />
          </div>
          <div className="stat-info">
            <h4>{activeAdmins}</h4>
            <p>Active Admins</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <RiShieldUserLine />
          </div>
          <div className="stat-info">
            <h4>{superAdmins}</h4>
            <p>AdminX</p>
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="users-table-card">
        <div className="users-table-header">
          <h3 className="users-table-title">All Administrators</h3>
          <div className="users-table-search">
            <RiSearchLine className="users-table-search-icon" />
            <input type="text" placeholder="Search admins..." id="search-admins-input" />
          </div>
        </div>

        <div className="users-table-body">
          <Table hover id="admins-table">
            <thead>
              <tr>
                <th>Admin</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={`admin-${admin.id}`}
                  className={selectedRowId === admin.id ? 'selected-row' : ''}
                  onClick={() => handleRowClick(admin)}
                  id={`admin-row-${admin.id}`}
                >
                  <td>
                    <div className="user-avatar-cell">
                      <div className={`user-avatar ${getAvatarGradient(admin.id)}`}>
                        {getInitials(admin.name)}
                      </div>
                      <div>
                        <div className="user-name">{admin.name}</div>
                        <div className="user-email-sub">ID: #{String(admin.id).padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{admin.email}</td>
                  <td>
                    <span className={getRoleBadgeClass(admin.role)}>
                      {formatRole(admin.role)}
                    </span>
                  </td>
                  <td>
                    <span className="status-indicator">
                      <span className={`status-dot ${admin.status}`} />
                      {admin.status === 'Active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>
                    {new Date(admin.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="row-action-btn view"
                        onClick={(e) => handleViewClick(e, admin)}
                        title="View Details"
                        id={`view-admin-${admin.id}`}
                      >
                        <RiEyeLine />
                      </button>
                      <button
                        className="row-action-btn delete"
                        onClick={(e) => e.stopPropagation()}
                        title="Remove Admin"
                        id={`delete-admin-${admin.id}`}
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

      {/* Add Admin Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered id="add-admin-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add New Administrator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit} id="add-admin-form" className="admin-add-form">
            <div className="admin-form-group">
              <Form.Label>Full Name</Form.Label>
              <div className="input-icon-wrapper">
                <RiUserLine className="input-icon" />
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  className="has-icon"
                  id="new-admin-name"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <Form.Label>Email Address</Form.Label>
              <div className="input-icon-wrapper">
                <RiMailLine className="input-icon" />
                <Form.Control
                  type="email"
                  placeholder="admin@example.com"
                  className="has-icon"
                  id="new-admin-email"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <Form.Label>Password</Form.Label>
              <div className="input-icon-wrapper">
                <RiLockLine className="input-icon" />
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="has-icon"
                  id="new-admin-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLineAlt />}
                </button>
              </div>
            </div>

            <div className="admin-form-group">
              <Form.Label>Role</Form.Label>
              <Form.Select id="new-admin-role">
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="AdminX">AdminX</option>
              </Form.Select>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSubmit}>
            Create Admin
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Admin Detail Modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetail} centered id="admin-detail-modal">
        <Modal.Header closeButton>
          <Modal.Title>Admin Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAdmin && (
            <>
              <div className="user-detail-header">
                <div className="user-detail-avatar">
                  {getInitials(selectedAdmin.name)}
                </div>
                <div className="user-detail-info">
                  <h3>{selectedAdmin.name}</h3>
                  <p>
                    <span className={`badge ${selectedAdmin.role === 'AdminX' || selectedAdmin.role === 'Admin' ? 'bg-primary' : 'bg-warning'}`}>
                      {formatRole(selectedAdmin.role)}
                    </span>
                    {' '}
                    <span className="status-indicator" style={{ marginLeft: '0.5rem' }}>
                      <span className={`status-dot ${selectedAdmin.status}`} />
                      {selectedAdmin.status === 'Active' ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="user-detail-grid">
                <div className="user-detail-item">
                  <span className="label">Admin ID</span>
                  <span className="value">#{String(selectedAdmin.id).padStart(4, '0')}</span>
                </div>
                <div className="user-detail-item">
                  <span className="label">Email</span>
                  <span className="value">{selectedAdmin.email}</span>
                </div>
                <div className="user-detail-item">
                  <span className="label">Role</span>
                  <span className="value">{formatRole(selectedAdmin.role)}</span>
                </div>
                <div className="user-detail-item">
                  <span className="label">Created</span>
                  <span className="value">{new Date(selectedAdmin.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</span>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseDetail}>
            Close
          </Button>
          <Button variant="primary">
            Edit Admin
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminManagementPage;
