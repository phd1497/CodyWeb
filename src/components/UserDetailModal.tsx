import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RiMailLine, RiCalendarLine, RiShieldLine } from 'react-icons/ri';
import type { UserProfile } from '../types';

interface UserDetailModalProps {
  user: UserProfile | null;
  show: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, show, onClose }) => {
  if (!user) return null;

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

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
              <span className="badge bg-secondary">{user.role}</span>
              {' '}
              <span className="status-indicator" style={{ marginLeft: '0.5rem' }}>
                <span className={`status-dot ${user.status}`} />
                {user.status}
              </span>
            </p>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="user-detail-grid">
          <div className="user-detail-item">
            <span className="label">
              <RiShieldLine style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
              User UID
            </span>
            <span className="value">{user.uid}</span>
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
              <RiCalendarLine style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
              Joined Date
            </span>
            <span className="value">{new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
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
