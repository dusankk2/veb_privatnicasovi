import React from 'react';
import './Message.css';

const Message = ({ type = 'info', title, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`message message-${type}`}>
      <div className="message-header">
        <span className="message-icon">{getIcon()}</span>
        <h4>{title}</h4>
        {onClose && (
          <button className="message-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      {message && <p className="message-content">{message}</p>}
    </div>
  );
};

export default Message;