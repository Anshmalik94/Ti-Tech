import React from 'react';
import './Notification.css'; // Add your CSS styles

const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;
