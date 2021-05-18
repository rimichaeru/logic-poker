


class Deck {
  constructor () {
    this.deck = this.create();
  }

  create = () => {
    const suits = ["H", "S", "C", "D"];
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10]
    const pictures = ["j", "q", "k", "a"]
  
    let deck = [];
  
    for (const suit of suits) {
      for (const number of numbers) {
        deck.push(number+suit);
      }
  
      for (const picture of pictures) {
        deck.push(picture+suit)
      }
    }
    return deck;
  }

  dealCards = (cardAmount) => {
    let dealtCards = [];

    for (let i = 0; i < cardAmount; i++) {
      if (this.deck.length == 0) {
        break;
      }
      // Randomise between 0 and deck length, eg. 0-51
      const randomCard = this.deck[Math.floor(Math.random() * this.deck.length)];
      dealtCards.push(randomCard); 
      this.deck = this.deck.filter((card) => {
        return randomCard != card;
      })
    }

    return dealtCards;
  }
}




class Player {
  constructor () {
  
  }
}




const activeDeck = new Deck();
console.log(activeDeck.deck)

const cards = activeDeck.dealCards(20);
console.log(cards, cards.length)
console.log(activeDeck.deck, activeDeck.deck.length)