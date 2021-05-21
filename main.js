class Game {
  constructor() {
    // init held coins
    this.heldCoins = 0;
    this.setCoins();

    this.savedCards = [];
    // set ante
    this.setAnte()

    // init deck and players
    this.deck = null;
    this.pMain = null;
    this.pOne = null;
    this.pTwo = null;
    this.pThree = null;
    this.newDeal()

    // Saving backup of main player's cards
    this.savedpMain = this.pMain;
    this.pMain.showCards();

    this.decideWinner();
    
  }

  decideWinner() {
    this.pOne.showCards();
    this.pTwo.showCards();
    this.pThree.showCards();


    const getNumberedCards = (cardArray) => {
      // card to number, for comparisons
      let numberedCards = [];
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
        numberedCards.push(currentCardValue + cardArray[i][cardArray[i].length-1]);
      }

      return numberedCards;
    }

    // cards are now 14S instead of AS
    let numMain = getNumberedCards(this.pMain.playerHand);
    let numOne = getNumberedCards(this.pOne.playerHand);
    let numTwo = getNumberedCards(this.pTwo.playerHand);
    let numThree = getNumberedCards(this.pThree.playerHand);

    const getRanking = (cards) => {
      // shorthand for splitting the card number and suit
      const sp = (card) => {
        const num = card.slice(0, card.length-1);
        const suit = card.slice(card.length-1);
        return [Number(num), suit]
      }

      const getNumberArr = (playerHand) => {
        return playerHand.map((card) => {
          return sp(card)[0];
        })
      }

      const getSuitArr = (playerHand) => {
        return playerHand.map((card) => {
          return sp(card)[1];
        })
      }
      
      // ranking result needs to be [rankValue, cardNumber]
      // cardNumber won't always be used, but is needed for comparisons, eg. two people have a pair each, cardNumber shows which is higher
      let rank = [0, 0];
      // ranks are updated/replaced as ranking matches are made
      // there are 9 poker card rankings

      const numCards = getNumberArr(cards);
      
      // high card
      const hc = Math.max(...numCards);
      rank = [1, hc]

      // pairs, trips, quads, full house, two pair
      // pair if 1, rank 2
      // two pair if 1 and 1, rank 3
      // trips if 3, rank 4
      // full house if 1 and 3 (or 3 and 1), rank 7
      // quads if 6, rank 8
      let pairs = [];
      for (let i = 0; i < numCards.length-1; i++) {
        const forwardSlice = numCards.slice(i+1);
        for (let j = 0; j < forwardSlice.length; j++) {
          if (numCards[i] == forwardSlice[j]) {
            pairs.push(numCards[i])
            continue;
          }
        }
      }
      // counting numbers in pairs[]
      var counts = {};
      for (var i = 0; i < pairs.length; i++) {
        var num = pairs[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
      // setting rank for pairs[]
      if (Object.keys(counts).length == 1) {
        // single pair, trip, quad
        const key = Object.keys(counts)[0];
        const occurrence = counts[key];
        if (occurrence == 6) {
          rank = [8, Number(key)];
        } else if (occurrence == 3) {
          rank = [4, Number(key)];
        } else {
          rank = [2, Number(key)];
        }

      } else if (Object.keys(counts).length == 2) {
        // two pair, fh
        const key = Object.keys(counts); // two item array
        const occurrenceOne = counts[key[0]];
        const occurrenceTwo = counts[key[1]];

        if (occurrenceOne == occurrenceTwo) {
          // two pair, format is special; [rank, highPair, lowPair] for comparisons
          rank = [3, Math.max(Number(key[0]), Number(key[1])), Math.min(Number(key[0]), Number(key[1]))];
        } else {
          rank = [7, Math.max(Number(key[0]), Number(key[1]))]
        }
      } else {
        rank = rank;
      }

      console.log(counts);
      console.log(rank);

      // flush
      const suits = getSuitArr(cards);
      if (suits.every(val => val === suits[0])) {
        rank = [6, Math.max(...numCards)]
      }

      // straight, straight flush
      


    }

    const testp1 = [ "7H", "5C", "13D", "12C", "12H" ] // pair
    const testp2 = [ "7H", "12C", "12H", "5C", "13D" ] // pair
    const testtp1 = [ "8H", "8C", "12H", "13C", "13D" ] // two pair
    const testtp2 = [ "7H", "12C", "12H", "5C", "5D" ] // two pair
    const testtp3 = [ "5H", "7C", "12H", "7C", "5D" ] // two pair
    const testt1 = [ "7H", "5C", "12D", "12C", "12H" ] // trip
    const testt2 = [ "7H", "12D", "12C", "12H", "5C" ] // trip
    const testt3 = [ "7H", "12D", "12C", "5C", "12H" ] // trip
    const testq1 = [ "7H", "12D", "12C", "12S", "12H" ] // quad
    const testq2 = [ "12D", "12C", "12S", "12H", "7H" ] // quad
    const testfh1 = [ "7C", "12C", "12S", "12H", "7H" ] // fh
    const testfh2 = [ "12D", "12C", "12S", "7C", "7H" ] // fh
    const testfh3 = [ "12D", "12C", "7C", "12H", "7H" ] // fh

    const testfl1 = [ "11C", "12C", "7C", "8C", "5C" ] // flush
    const testfl2 = [ "11C", "12C", "7C", "8C", "5H" ] // flush almost

    getRanking(testfl1);

    // toggle winner
    // give/take coins

  }

  setCoins() {
    this.heldCoins = 3000;
    const displayedCoins = document.querySelector(".coin-amount");
    displayedCoins.textContent = this.heldCoins;
  }
  
  setAnte() {
    // --------------- ANTE
    // randomises ante amount for players to chip in EACH
    const radioLow = document.querySelector("#low");
    const radioMid = document.querySelector("#mid");
    const radioHigh = document.querySelector("#high");

    let radioCheckMult = 1;
    let radioCheckAdd = 1;
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
  }


  newDeal() {
    // creates a fresh deck in .deck
    const deckInst = new Deck();

    // deals 20 random cards for the play as the activeCards
    let activeCardsArr = deckInst.dealCards(deckInst.deck, 20);
    let activeCards = activeCardsArr[1];
    console.log("activeCards:", activeCards, deckInst);
    
    // creates each player;
    this.pMain = new Player("mainPlayer", activeCards, deckInst);
    activeCards = this.pMain.activeCards
    // saved cards are also the cards displayed
    this.savedCards = activeCards;
    this.pOne = new Player("topPlayer", activeCards, deckInst);
    activeCards = this.pOne.activeCards
    this.pTwo = new Player("leftPlayer", activeCards, deckInst);
    activeCards = this.pTwo.activeCards
    this.pThree = new Player("rightPlayer", activeCards, deckInst);
    activeCards = this.pThree.activeCards
    
    console.log(this.pOne.playerHand);
    console.log(this.pTwo.playerHand);
    console.log(this.pThree.playerHand);
    console.log(this.pMain.playerHand);
    
    console.log("Must be an empty arr after dealing - activeCards: ", activeCards);
    
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
    
    this.savedCards = orderCards(this.savedCards)
    
    const cardGridCards = document.querySelectorAll(".card-grid .card");
    
    for (let i = 0; i < this.savedCards.length; i++) {
      cardGridCards[i].id = this.savedCards[i];
    
      if (this.savedCards[i][this.savedCards[i].length - 1] == "H") {
        cardGridCards[i].classList.add("heart");
      } else if (this.savedCards[i][this.savedCards[i].length - 1] == "C") {
        cardGridCards[i].classList.add("club");
      } else if (this.savedCards[i][this.savedCards[i].length - 1] == "S") {
        cardGridCards[i].classList.add("spade");
      } else {
        cardGridCards[i].classList.add("diamond");
      }
    
      cardGridCards[i].innerHTML += `<p class="u"></p><div class="l"></div>`;
      cardGridCards[i].querySelector(".u").textContent = this.savedCards[i].slice(
        0,
        length - 1
      );
    }
  }


}


// ---------------- HELD COINS
// const inputBet = Number(document.querySelector('.bet-amount').textContent);
// if (typeof inputBet !== "number" || inputBet <= 0) {
  
// }

// Currently, hidden class does nothing, is it needed?


const play = new Game();






