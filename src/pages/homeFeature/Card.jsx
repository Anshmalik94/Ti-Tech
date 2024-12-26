import React from 'react';
import './Card.css'; 

const Card = ({ img, description, onReadMore }) => {
  return (
    <div className="card">
      <img src={img} alt="Card visual" className="card-image" />
      <div className="card-content">
        <p className="card-description">{description}</p>
        <button className="read-more" onClick={onReadMore}>Read More</button>
      </div>
    </div>
  );
};

export default Card;
