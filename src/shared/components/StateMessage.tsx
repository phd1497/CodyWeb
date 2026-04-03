import React from 'react';

interface StateMessageProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const StateMessage: React.FC<StateMessageProps> = ({ title, message, actionLabel, onAction }) => {
  return (
    <div className="state-message">
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction ? (
        <button className="hero-btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default React.memo(StateMessage);
