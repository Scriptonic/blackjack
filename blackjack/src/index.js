import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Card from './Card';
import Deck from './Deck';
import Hand from './Hand';
import Game from './Game';

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);
