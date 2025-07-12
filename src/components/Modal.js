import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return React.createElement('div', { className: 'modal-overlay' },
    React.createElement('div', { className: 'modal-container' },
      React.createElement('div', { className: 'modal-content' },
        React.createElement('div', { className: 'modal-header' },
          React.createElement('div', { className: 'modal-title-section' },
            React.createElement('span', { className: 'modal-icon' }, '✅'),
            React.createElement('h3', { className: 'modal-title' }, title)
          ),
          React.createElement('button', {
            onClick: onClose,
            className: 'modal-close-btn'
          }, '✕')
        ),
        React.createElement('p', { className: 'modal-message' }, message),
        React.createElement('button', {
          onClick: onClose,
          className: 'modal-action-btn'
        }, 'Great!')
      )
    )
  );
};

export default Modal;