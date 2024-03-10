// CommentModal.js
import React from 'react';
import './CommentModal.css';

export const CommentModal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Write your review</h2>
        <br/>
        <textarea placeholder="Write your comment here..." />
        <br/>
        <div className="button-container">
          <button className="close-button" onClick={onClose}>Close</button>
          <button className="post-button">Post</button>
        </div>
      </div>
    </div>
  );
};
