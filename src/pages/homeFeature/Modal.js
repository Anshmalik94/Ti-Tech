import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;  

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>X</button> 
        <div className="modal-content">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
