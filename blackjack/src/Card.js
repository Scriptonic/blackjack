import React from 'react';

const Card = ({ suit, value }) => {
  const getColor = () => {
    if (suit === 'clubs' || suit === 'spades') {
      return 'black';
    } else {
      return 'red';
    }
  };

  return (
    <div className="card" style={{ color: getColor() }}>
      <div className="card-value">{value}</div>
      <div className="card-suit">{suit}</div>
    </div>
  );
};

export default Card;
