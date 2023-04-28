import React, { useState, useEffect } from 'react';
import Deck from './Deck';
import Hand from './Hand';

const Game = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [message, setMessage] = useState('');
  const [gameDeck, setGameDeck] = useState(new Deck());

  useEffect(() => {
    setPlayerCards([gameDeck.drawCard(), gameDeck.drawCard()]);
    setDealerCards([gameDeck.drawCard(), gameDeck.drawCard()]);
  }, [gameDeck]);

  const getPlayerTotal = (cards) => {
    let total = 0;
    let hasAce = false;
    for (let card of cards) {
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
    setPlayerCards([...playerCards, gameDeck.drawCard()]);
  };

  const handleStand = () => {
    setIsGameOver(true);
  };

  useEffect(() => {
    if (isGameOver) {
      let dealerCardsCopy = [...dealerCards];
      let dealerTotal = getPlayerTotal(dealerCardsCopy);
      while (dealerTotal < 17) {
        dealerCardsCopy = [...dealerCardsCopy, gameDeck.drawCard()];
        dealerTotal = getPlayerTotal(dealerCardsCopy);
      }
      setDealerCards(dealerCardsCopy);
      const playerTotal = getPlayerTotal(playerCards);
      const newDealerTotal = getPlayerTotal(dealerCardsCopy);
      if (playerTotal > 21) {
        setMessage('You busted! Dealer wins!');
        setScore(score - 1);
      } else if (newDealerTotal > 21) {
        setMessage('Dealer busted! You win!');
        setScore(score + 1);
      } else if (playerTotal > newDealerTotal) {
        setMessage('You win!');
        setScore(score + 1);
      } else if (playerTotal < newDealerTotal) {
        setMessage('Dealer wins!');
        setScore(score - 1);
      } else {
        setMessage('It\'s a tie!');
      }
    }
  }, [isGameOver, dealerCards, dealerCards.length, playerCards, gameDeck, score]);

  const handleNewGame = () => {
    const newDeck = new Deck();
    setGameDeck(newDeck);
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
        <p>Total: {getPlayerTotal(playerCards)}</p>
      </div>
      <div>
        <h2>Dealer</h2>
        <Hand cards={dealerCards} />
        <p>Total: {getPlayerTotal(dealerCards)}</p>
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

