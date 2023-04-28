import React, { useState, useEffect } from 'react';
import Card from './Card';
import Deck from './Deck';
import Hand from './Hand';

const deck = new Deck();

const Game = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [message, setMessage] = useState('');
  const [deck, setDeck] = useState(new Deck());

  useEffect(() => {
    setPlayerCards([deck.drawCard(), deck.drawCard()]);
    setDealerCards([deck.drawCard(), deck.drawCard()]);
  }, [deck]);

  const getPlayerTotal = () => {
    let total = 0;
    let hasAce = false;
    for (let card of playerCards) {
      if (card.value === 'A') {
        hasAce = true;
      }
      total += parseInt(card.rank, 10);
    }
    if (hasAce && total <= 11) {
      total += 10;
    }
    return total;
  };

  const getDealerTotal = () => {
    let total = 0;
    let hasAce = false;
    for (let card of dealerCards) {
      if (card.value === 'A') {
        hasAce = true;
      }
      total += parseInt(card.rank, 10);
    }
    if (hasAce && total <= 11) {
      total += 10;
    }
    return total;
  };

  const handleHit = () => {
    setPlayerCards([...playerCards, deck.drawCard()]);
  };

  const handleStand = () => {
    setIsGameOver(true);
  };

  useEffect(() => {
    if (isGameOver) {
      while (getDealerTotal() < 17) {
        deck.shuffle();
        setDealerCards([...dealerCards, deck.drawCard()]);
      }
  
      const playerTotal = getPlayerTotal();
      const dealerTotal = getDealerTotal();
  
      if (playerTotal > 21) {
        setMessage('You busted! Dealer wins!');
        setScore(score - 1);
      } else if (dealerTotal > 21) {
        setMessage('Dealer busted! You win!');
        setScore(score + 1);
      } else if (playerTotal > dealerTotal) {
        setMessage('You win!');
        setScore(score + 1);
      } else if (playerTotal < dealerTotal) {
        setMessage('Dealer wins!');
        setScore(score - 1);
      } else {
        setMessage('It\'s a tie!');
      }
    }
  }, [isGameOver, deck, dealerCards, getPlayerTotal, getDealerTotal, score]);

  const handleNewGame = () => {
    const newDeck = new Deck();
    setDeck(newDeck);
    setPlayerCards([newDeck.drawCard(), newDeck.drawCard()]);
    setDealerCards([newDeck.drawCard(), newDeck.drawCard()]);
    setIsGameOver(false);
    setMessage('');
  };

  return (
    <div>
      <div>
        <h2>Player</h2>
        <Hand cards={playerCards} />
        <button onClick={handleHit} disabled={isGameOver}>Hit</button>
        <button onClick={handleStand} disabled={isGameOver}>Stand</button>
        <p>Total: {getPlayerTotal()}</p>
      </div>
      <div>
        <h2>Dealer</h2>
        <Hand cards={dealerCards} />
        <p>Total: {getDealerTotal()}</p>
      </div>
      <div>
        <p>Score: {score}</p>
        <p>{message}</p>
        {isGameOver && <button onClick={handleNewGame}>New Game</button>}
      </div>
    </div>
  );
}

export default Game

