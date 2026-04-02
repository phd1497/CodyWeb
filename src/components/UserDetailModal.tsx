import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiCalendarLine, RiShieldLine } from 'react-icons/ri';
import { User } from '../types';

interface UserDetailModalProps {
  user: User | null;
  show: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, show, onClose }) => {
  if (!user) return null;

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-primary';
      case 'moderator': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg" id="user-detail-modal">
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Header with Avatar */}
        <div className="user-detail-header">
          <div className="user-detail-avatar">
            {getInitials(user.name)}
          </div>
          <div className="user-detail-info">
            <h3>{user.name}</h3>
            <p>
              <span className={`badge ${getRoleBadgeClass(user.role)}`}>{user.role}</span>
              {' '}
              <span className="status-indicator" style={{ marginLeft: '0.5rem' }}>
                <span className={`status-dot ${user.status}`} />
                {user.status === 'Active' ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="user-detail-grid">
          <div className="user-detail-item">
            <span className="label">
              <RiShieldLine style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
              User ID
            </span>
            <span className="value">#{String(user.id).padStart(4, '0')}</span>
          </div>

          <div className="user-detail-item">
            <span className="label">
              <RiMailLine style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
              Email
            </span>
            <span className="value">{user.email}</span>
          </div>

          <div className="user-detail-item">
            <span className="label">
              <RiPhoneLine style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
              Phone
            </span>
            <span className="value">{user.phone}</span>
          </div>

          <div className="user-detail-item">
            <span className="label">
              <RiCalendarLine style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
              Joined Date
            </span>
            <span className="value">{new Date(user.joinedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
          </div>

          <div className="user-detail-item" style={{ gridColumn: '1 / -1' }}>
            <span className="label">
              <RiMapPinLine style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
              Address
            </span>
            <span className="value">{user.address}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary">
          Edit User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailModal;
