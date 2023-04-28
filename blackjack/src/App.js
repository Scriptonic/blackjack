import React from 'react';
import Card from './Card';
import Deck from './Deck';
import Hand from './Hand';
import Game from './Game';

const deck =  Deck;

const App = () => {
  return (
    <div className="app">
      <h1>Blackjack</h1>
      <Game deck={deck}/>
    </div>
  );
};

export default App;