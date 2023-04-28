import React, { useState } from 'react';

class Deck {
    constructor() {
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      const values = [
        { value: 'A', rank: '1' },
        { value: '2', rank: '2' },
        { value: '3', rank: '3' },
        { value: '4', rank: '4' },
        { value: '5', rank: '5' },
        { value: '6', rank: '6' },
        { value: '7', rank: '7' },
        { value: '8', rank: '8' },
        { value: '9', rank: '9' },
        { value: '10', rank: '10' },
        { value: 'J', rank: '11' },
        { value: 'Q', rank: '12' },
        { value: 'K', rank: '13' },
      ];
      this.cards = [];
      for (let suit of suits) {
        for (let value of values) {
          this.cards.push({ suit, ...value });
        }
      }
      this.shuffle();
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    drawCard() {
      return this.cards.pop();
    }

    reset() {

        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = [
        { value: 'A', rank: '1' },
        { value: '2', rank: '2' },
        { value: '3', rank: '3' },
        { value: '4', rank: '4' },
        { value: '5', rank: '5' },
        { value: '6', rank: '6' },
        { value: '7', rank: '7' },
        { value: '8', rank: '8' },
        { value: '9', rank: '9' },
        { value: '10', rank: '10' },
        { value: 'J', rank: '11' },
        { value: 'Q', rank: '12' },
        { value: 'K', rank: '13' },
      ];
        this.cards = [];
      
        // Add all cards to the deck
        for (let suit of suits) {
          for (let value of values) {
            this.cards.push({ suit, ...value });
          }
        }
      
        // Shuffle the deck
        this.shuffle();
      }
  }
  
  export default Deck;
  