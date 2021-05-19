class Deck {
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

class Player {
  constructor(location) {
    this.location = location;
    this.playerHand = this.getCards(activeCards);
  }

  // Must be called Temp, otherwise activeCards doesn't update globally
  getCards(activeCardsTemp) {
    // deals 5 cards from the activeCards and updates activeCards
    const playerHandArr = deckInst.dealCards(
      (deck = activeCards),
      (cardAmount = 5)
    );
    activeCards = playerHandArr[0];
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

// creates a fresh deck in .deck
let deckInst = new Deck();

// deals 20 random cards for the play as the activeCards
let activeCardsArr = deckInst.dealCards(
  (deck = deckInst.deck),
  (cardAmount = 20)
);
let activeCards = activeCardsArr[1];
console.log("activeCards:", activeCards);

// creates each player;
const pMain = new Player("mainPlayer");
let savedpMain = pMain;
// saved cards are also the cards displayed
let savedCards = activeCards;
const pOne = new Player("topPlayer");
const pTwo = new Player("leftPlayer");
const pThree = new Player("rightPlayer");

console.log(pOne.playerHand);
console.log(pTwo.playerHand);
console.log(pThree.playerHand);
console.log(pMain.playerHand);

console.log("activeCards:", activeCards);

// Currently, hidden class does nothing, is it needed?

// HTML DOM links

// show grid cards


// ORDERING GRID CARDS FIRST
// let orderedSavedCards = [];
// for (let i = 0; i < savedCards.length; i++) {
//   // get card value and convert to a number for easy comparison
//   var currentCardValue = savedCards[i].slice(0, length - 1);
//   if (currentCardValue == "J") {
//     currentCardValue = 11;
//   } else if (currentCardValue == "Q") {
//     currentCardValue = 12;
//   } else if (currentCardValue == "K") {
//     currentCardValue = 13;
//   } else if (currentCardValue == "A"){
//     currentCardValue = 14;
//   } else {
//     currentCardValue = Number(currentCardValue);
//   }
//   orderedSavedCards.push(currentCardValue + savedCards[i][savedCards[i].length-1]);
// }

// let sortCards = (inputArr) => {

//   // WHY DOES THIS NOT WORK?
//   const getVal = (arrayItem) => {
//     let length = arrayItem.length;
//     return arrayItem[length-1];
//   }
  
//   let len = inputArr.length;
//   let swapped;
//   do {
//     swapped = false;
//     for (let i = 0; i < len; i++) {
//       if (getVal(inputArr[i]) > getVal(inputArr[i + 1])) {
//         let tmp = inputArr[i];
//         inputArr[i] = inputArr[i + 1];
//         inputArr[i + 1] = tmp;
//         swapped = true;
//       }
//     }
//   } while (swapped);
//   return inputArr;
// };

// console.log(sortCards(orderedSavedCards))
// console.log(orderedSavedCards);



const cardGridCards = document.querySelectorAll(".card-grid .card");

for (let i = 0; i < savedCards.length; i++) {
  cardGridCards[i].id = savedCards[i];

  if (savedCards[i][savedCards[i].length - 1] == "H") {
    cardGridCards[i].classList.add("heart");
  } else if (savedCards[i][savedCards[i].length - 1] == "C") {
    cardGridCards[i].classList.add("club");
  } else if (savedCards[i][savedCards[i].length - 1] == "S") {
    cardGridCards[i].classList.add("spade");
  } else {
    cardGridCards[i].classList.add("diamond");
  }

  cardGridCards[i].innerHTML += `<p class="u"></p><div class="l"></div>`;
  cardGridCards[i].querySelector(".u").textContent = savedCards[i].slice(
    0,
    length - 1
  );
}

pMain.showCards();

// Hide all cards after they're set
