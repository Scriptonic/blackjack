import React from 'react';
import Card from './Card';

const Hand = ({ cards }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card key={index} suit={card.suit} value={card.value} />
      ))}
    </div>
  );
};

export default Hand;
