export class Deck {
  constructor() {
    this.deck = this.create();
  }

  create = () => {
    const suits = ["H", "S", "C", "D"];
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const pictures = ["J", "Q", "K", "A"];

    let deck = [];

    for (const suit of suits) {
      for (const number of numbers) {
        deck.push(number + suit);
      }

      for (const picture of pictures) {
        deck.push(picture + suit);
      }
    }
    return deck;
  };

  dealCards = (deck, cardAmount) => {
    let dealtCards = [];

    for (let i = 0; i < cardAmount; i++) {
      if (deck.length == 0) {
        break;
      }
      // Randomise between 0 and deck length, eg. 0-51
      const randomCard = deck[Math.floor(Math.random() * deck.length)];
      dealtCards.push(randomCard);
      deck = deck.filter((card) => {
        return randomCard != card;
      });
    }

    return [deck, dealtCards];
  };
}

export class Player {
  constructor(location, activeCards, deckInst) {
    this.location = location;
    this.deckInst = deckInst;
    this.activeCards = activeCards;
    this.playerHand = this.getCards(activeCards);
    // turn off the winner class
    this.winner = document.querySelector(`.${this.location}`).classList;
    this.winner.toggle("winner");
    
  }

  // Must be called Temp, otherwise activeCards doesn't update globally
  getCards(activeCardsTemp) {
    // deals 5 cards from the activeCards and updates activeCards
    const playerHandArr = this.deckInst.dealCards(activeCardsTemp, 5);
    this.activeCards = playerHandArr[0];
    return playerHandArr[1];
  }

  showCards() {
    const playerCards = document.querySelectorAll(`.${this.location} .card`);

    for (let i = 0; i < this.playerHand.length; i++) {
      playerCards[i].id = this.playerHand[i];

      if (this.playerHand[i][this.playerHand[i].length - 1] == "H") {
        playerCards[i].classList.add("heart");
      } else if (this.playerHand[i][this.playerHand[i].length - 1] == "C") {
        playerCards[i].classList.add("club");
      } else if (this.playerHand[i][this.playerHand[i].length - 1] == "S") {
        playerCards[i].classList.add("spade");
      } else {
        playerCards[i].classList.add("diamond");
      }

      playerCards[i].innerHTML += `<p class="u"></p><div class="l"></div>`;
      playerCards[i].querySelector(".u").textContent = this.playerHand[i].slice(
        0,
        length - 1
      );
    }
  }
}