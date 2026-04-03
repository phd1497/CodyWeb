import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
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
import type { AdminProfile } from '../../types';
import { getAllAdmins, createAdmin } from '../../services/firestoreService';
import { adminSignIn } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Users.css';
import '../../styles/AdminManagement.css';

const AdminManagementPage = () => {
  const { firebaseUser } = useAuth();
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminProfile | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Add Admin form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<AdminProfile['role']>('Admin');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Current admin's email for re-auth after creating new admin
  const [currentPassword, setCurrentPassword] = useState('');

  // Fetch admins from Firestore
  const fetchAdmins = async () => {
    try {
      const data = await getAllAdmins();
      setAdmins(data);
    } catch (err) {
      console.error('Error fetching admins:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleRowClick = (admin: AdminProfile) => {
    setSelectedRowId(admin.uid);
    setSelectedAdmin(admin);
    setShowDetailModal(true);
  };

  const handleViewClick = (e: React.MouseEvent, admin: AdminProfile) => {
    e.stopPropagation();
    setSelectedRowId(admin.uid);
    setSelectedAdmin(admin);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedAdmin(null);
    setSelectedRowId(null);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!newName.trim()) { setAddError('Name is required.'); return; }
    if (!newEmail.trim()) { setAddError('Email is required.'); return; }
    if (!newPassword.trim() || newPassword.length < 6) { setAddError('Password must be at least 6 characters.'); return; }
    if (!currentPassword.trim()) { setAddError('Enter your current password to verify.'); return; }

    setAddLoading(true);
    try {
      // Create the new admin (this will sign out current user)
      await createAdmin(newEmail.trim(), newPassword, newName.trim(), newRole);

      // Re-authenticate the current admin
      if (firebaseUser?.email) {
        await adminSignIn(firebaseUser.email, currentPassword);
      }

      // Reset form & refresh list
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewRole('Admin');
      setCurrentPassword('');
      setShowAddModal(false);
      await fetchAdmins();
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/email-already-in-use') {
        setAddError('An account with this email already exists.');
      } else if (code === 'auth/weak-password') {
        setAddError('Password should be at least 6 characters.');
      } else {
        setAddError('Failed to create admin. Please try again.');
      }
    } finally {
      setAddLoading(false);
    }
  };

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const getAvatarGradient = (uid: string) => {
    const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];
    const hash = uid.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'AdminX': return 'role-badge admin';
      case 'Admin': return 'role-badge admin';
      case 'Moderator': return 'role-badge moderator';
      default: return 'role-badge user';
    }
  };

  // Stats
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter((a) => a.status === 'Active').length;
  const adminXCount = admins.filter((a) => a.role === 'AdminX').length;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

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
          <div className="stat-icon primary"><RiShieldUserLine /></div>
          <div className="stat-info">
            <h4>{totalAdmins}</h4>
            <p>Total Admins</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><RiShieldUserLine /></div>
          <div className="stat-info">
            <h4>{activeAdmins}</h4>
            <p>Active Admins</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><RiShieldUserLine /></div>
          <div className="stat-info">
            <h4>{adminXCount}</h4>
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
          {admins.length === 0 ? (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
              No administrators found. Add your first admin above.
            </div>
          ) : (
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
                    key={admin.uid}
                    className={selectedRowId === admin.uid ? 'selected-row' : ''}
                    onClick={() => handleRowClick(admin)}
                    id={`admin-row-${admin.uid}`}
                  >
                    <td>
                      <div className="user-avatar-cell">
                        <div className={`user-avatar ${getAvatarGradient(admin.uid)}`}>
                          {getInitials(admin.name)}
                        </div>
                        <div>
                          <div className="user-name">{admin.name}</div>
                          <div className="user-email-sub">UID: {admin.uid.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{admin.email}</td>
                    <td>
                      <span className={getRoleBadgeClass(admin.role)}>
                        {admin.role}
                      </span>
                    </td>
                    <td>
                      <span className="status-indicator">
                        <span className={`status-dot ${admin.status}`} />
                        {admin.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>
                      {new Date(admin.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                        <button className="row-action-btn view" onClick={(e) => handleViewClick(e, admin)} title="View Details">
                          <RiEyeLine />
                        </button>
                        <button className="row-action-btn delete" onClick={(e) => e.stopPropagation()} title="Remove Admin">
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

      {/* Add Admin Modal */}
      <Modal show={showAddModal} onHide={() => { setShowAddModal(false); setAddError(null); }} centered id="add-admin-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add New Administrator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addError && (
            <Alert variant="danger" dismissible onClose={() => setAddError(null)} className="mb-3">
              {addError}
            </Alert>
          )}
          <Form onSubmit={handleAddSubmit} id="add-admin-form" className="admin-add-form">
            <div className="admin-form-group">
              <Form.Label>Full Name</Form.Label>
              <div className="input-icon-wrapper">
                <RiUserLine className="input-icon" />
                <Form.Control type="text" placeholder="Enter full name" className="has-icon" value={newName} onChange={(e) => setNewName(e.target.value)} disabled={addLoading} />
              </div>
            </div>

            <div className="admin-form-group">
              <Form.Label>Email Address</Form.Label>
              <div className="input-icon-wrapper">
                <RiMailLine className="input-icon" />
                <Form.Control type="email" placeholder="admin@example.com" className="has-icon" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} disabled={addLoading} />
              </div>
            </div>

            <div className="admin-form-group">
              <Form.Label>Password</Form.Label>
              <div className="input-icon-wrapper">
                <RiLockLine className="input-icon" />
                <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="has-icon" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={addLoading} />
                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLineAlt />}
                </button>
              </div>
            </div>

            <div className="admin-form-group">
              <Form.Label>Role</Form.Label>
              <Form.Select value={newRole} onChange={(e) => setNewRole(e.target.value as AdminProfile['role'])} disabled={addLoading}>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="AdminX">AdminX</option>
              </Form.Select>
            </div>

            <div className="admin-form-group">
              <Form.Label>Your Current Password (to verify)</Form.Label>
              <div className="input-icon-wrapper">
                <RiLockLine className="input-icon" />
                <Form.Control type="password" placeholder="Enter your password" className="has-icon" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} disabled={addLoading} />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => { setShowAddModal(false); setAddError(null); }} disabled={addLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSubmit} disabled={addLoading}>
            {addLoading ? <><Spinner animation="border" size="sm" className="me-2" />Creating...</> : 'Create Admin'}
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
                      {selectedAdmin.role}
                    </span>
                    {' '}
                    <span className="status-indicator" style={{ marginLeft: '0.5rem' }}>
                      <span className={`status-dot ${selectedAdmin.status}`} />
                      {selectedAdmin.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="user-detail-grid">
                <div className="user-detail-item">
                  <span className="label">Admin UID</span>
                  <span className="value">{selectedAdmin.uid.slice(0, 12)}...</span>
                </div>
                <div className="user-detail-item">
                  <span className="label">Email</span>
                  <span className="value">{selectedAdmin.email}</span>
                </div>
                <div className="user-detail-item">
                  <span className="label">Role</span>
                  <span className="value">{selectedAdmin.role}</span>
                </div>
                <div className="user-detail-item">
                  <span className="label">Created</span>
                  <span className="value">{new Date(selectedAdmin.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}</span>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseDetail}>Close</Button>
          <Button variant="primary">Edit Admin</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminManagementPage;
