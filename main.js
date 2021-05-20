// ---------------- HELD COINS
const heldCoins = 3000;
const inputBet = Number(document.querySelector('.bet-amount').textContent);
const displayedCoins = document.querySelector(".coin-amount") 
displayedCoins.textContent = heldCoins;
if (typeof inputBet !== "number" || inputBet <= 0) {
  
}

// --------------- ANTE
// randomises ante amount for players to chip in EACH
const radioLow = document.querySelector("#low");
const radioMid = document.querySelector("#mid");
const radioHigh = document.querySelector("#high");


if (radioHigh.checked) { // high
  radioCheckMult = 4;
  radioCheckAdd = Math.floor(Math.random()*50)+38;;
  document.querySelector(".coin-img").src = "./assets/coins_high.png";
} else if (radioMid.checked) { // mid
  radioCheckMult = 2;
  radioCheckAdd = Math.floor(Math.random()*26)+16;;
  document.querySelector(".coin-img").src = "./assets/coins_mid.png";
} else if (radioLow.checked) { // low
  radioCheckMult = 1;
  radioCheckAdd = 1;
  document.querySelector(".coin-img").src = "./assets/coins_low.png";
} else {
  radioCheckMult = 1;
  radioCheckAdd = 1;
  document.querySelector(".coin-img").src = "./assets/coins_low.png";
}

// base ante between 20 and 80
const baseAmount = Math.floor(Math.random()*80)+40;

const rounded = document.querySelector('#rounded');
let ante = 0;
if (rounded.checked) {
  ante = Math.round(((baseAmount + radioCheckAdd) * radioCheckMult/10/4))*10;
} else {
  ante = Math.round((baseAmount + radioCheckAdd) * radioCheckMult / 4);
}

const coins = document.querySelector('.board__mid-area__mid__coins');
const text = document.querySelector('.board__mid-area__mid__text');
text.textContent = `Each player covers the ${ante} coin ante.`
coins.textContent = ante * 4;







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

console.log("Must be an empty arr after dealing - activeCards: ", activeCards);

// Currently, hidden class does nothing, is it needed?

// ----------------------------------- HTML DOM links

// show grid cards


// ORDERING GRID CARDS FIRST
const orderCards = (cardArray) => {

  let orderedSavedCards = [];
  for (let i = 0; i < cardArray.length; i++) {
    // get card value and convert to a number for easy comparison
    var currentCardValue = cardArray[i].slice(0, length - 1);
    if (currentCardValue == "J") {
      currentCardValue = 11;
    } else if (currentCardValue == "Q") {
      currentCardValue = 12;
    } else if (currentCardValue == "K") {
      currentCardValue = 13;
    } else if (currentCardValue == "A"){
      currentCardValue = 14;
    } else {
      currentCardValue = Number(currentCardValue);
    }
    orderedSavedCards.push(currentCardValue + cardArray[i][cardArray[i].length-1]);
  }
  
  let sortCards = (inputArr) => {
  
    const getVal = (arrayItem="") => {
      return Number(arrayItem.slice(0, arrayItem.length-1));
    }
    
    let len = inputArr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len; i++) {
        if (getVal(inputArr[i]) > getVal(inputArr[i + 1])) {
          let tmp = inputArr[i];
          inputArr[i] = inputArr[i + 1];
          inputArr[i + 1] = tmp;
          swapped = true;
        }
      }
    } while (swapped);
    return inputArr;
  
  };

  // call the card sort
  orderedSavedCards = sortCards(orderedSavedCards)
  orderedSavedCards.shift() //removes first undefined item from the card sort
  
  // change numbers back into Ace/King/Queen/Jack
  let reversedOrderedCards = [];
  for (let i = 0; i < orderedSavedCards.length; i++) {
    var currentCardValue = orderedSavedCards[i].slice(0, length - 1);
    if (currentCardValue == "11") {
      currentCardValue = "J";
    } else if (currentCardValue == "12") {
      currentCardValue = "Q";
    } else if (currentCardValue == "13") {
      currentCardValue = "K";
    } else if (currentCardValue == "14"){
      currentCardValue = "A";
    } else {
      currentCardValue = currentCardValue;
    }
    reversedOrderedCards.push(currentCardValue + orderedSavedCards[i][orderedSavedCards[i].length-1]);
  }
  
  // currently sort is low to high, reverse it to show high cards first
  return reversedOrderedCards.reverse()
}


savedCards = orderCards(savedCards)


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


const decideWinner = (mainHand, oneHand, twoHand, threeHand) => {
  pOne.showCards();
  pTwo.showCards();
  pThree.showCards();
}