import {Deck, Player} from "./deck-player.js"

class Game {
  constructor() {
    // init held coins
    this.heldCoins = 0;
    this.setCoins(3000);

    this.savedCards = [];

    // set ante
    // init deck and players
    this.pot = 0;
    this.deck = null;
    this.pMain = null;
    this.pOne = null;
    this.pTwo = null;
    this.pThree = null;

    this.newRound();

    // Saving backup of main player's cards
    this.savedpMain = this.pMain;
    this.pMain.showCards();

    this.winner = null;
    this.draw = null;

    // bet event listener
    this.initButton();
    
  }

  initButton() {
    document.querySelector(".send-bet").addEventListener("click", () => {
      this.betAndShow();
    });

    document.querySelector(".next-round").addEventListener("click", () => {
      this.savedCards = [];

      this.deck = null;
      this.pMain.winner.toggle("winner", true);
      this.pOne.winner.toggle("winner", true);
      this.pTwo.winner.toggle("winner", true);
      this.pThree.winner.toggle("winner", true);
      
      this.pMain.hideCards();
      this.pOne.hideCards();
      this.pTwo.hideCards();
      this.pThree.hideCards();

      const cardGridCards = document.querySelectorAll(".card-grid .card");
    
      for (let i = 0; i < this.savedCards.length; i++) {
        cardGridCards[i].id = "";
      
        if (this.savedCards[i][this.savedCards[i].length - 1] == "H") {
          cardGridCards[i].classList = "card hidden";
        } else if (this.savedCards[i][this.savedCards[i].length - 1] == "C") {
          cardGridCards[i].classList = "card hidden";
        } else if (this.savedCards[i][this.savedCards[i].length - 1] == "S") {
          cardGridCards[i].classList = "card hidden";
        } else {
          cardGridCards[i].classList = "card hidden";
        }
      
        cardGridCards[i].innerHTML += `<p class="u"></p><div class="l"></div>`;
        cardGridCards[i].querySelector(".u").textContent = "";
      }



      this.newRound();

      // Saving backup of main player's cards
      this.savedpMain = this.pMain;
      this.pMain.showCards();

      this.winner = null;
      this.draw = null;
    });
  }

  newRound() {
    this.setAnte();
    this.newDeal();
  }

  // do bet

  betAndShow() {
    // remove bet amount from held coins
    const betAmount = document.querySelector(".bet-amount").value;
    this.setCoins(this.heldCoins-=betAmount);
    // add bet amount to pot from all players
    this.pot += betAmount*4;

    this.decideWinner();

    const text = document.querySelector('.board__mid-area__mid__coins');
    text.textContent = `Reward: ${this.pot} coins!`;

    // add to main player
    if (this.winner == "main") {
      console.log("Main has won!");
      this.setCoins(this.heldCoins+=this.pot);
    } else if (this.draw.includes(0)) {
      console.log("draw with main player!");
      const splitReward = Math.floor(this.pot / this.draw.length)
      this.setCoins(this.heldCoins+=splitReward);
      console.log("splitReward = ", splitReward);
    }
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

      
      // flush
      const suits = getSuitArr(cards);
      if (suits.every(val => val === suits[0])) {
        rank = [6, Math.max(...numCards)]
      }
      
      // straight, straight flush
      // sorts cards in order
      let sortCards = (inputArr) => {        
        let len = inputArr.length;
        let swapped;
        do {
          swapped = false;
          for (let i = 0; i < len; i++) {
            if (inputArr[i] > inputArr[i + 1]) {
              let tmp = inputArr[i];
              inputArr[i] = inputArr[i + 1];
              inputArr[i + 1] = tmp;
              swapped = true;
            }
          }
        } while (swapped);
        return inputArr;
      };

      let sortedNumCards = sortCards(numCards);
      console.log(sortedNumCards);

      let inOrder = true;
      for (let i = 0; i < sortedNumCards.length-1; i++) {
        if (!(sortedNumCards[i] == sortedNumCards[i+1]-1)) {
          inOrder = false;
          break;
        }
      }
      if (inOrder == true) {
        if (suits.every(val => val === suits[0])) {
          // straight flush
          rank = [9, Math.max(...numCards)];
        } else {
          // straight
          rank = [5, Math.max(...numCards)]
        } 
      }

      return rank;
    }

    // ------------------------------------------------ TESTING
    // test arrays
    // const testp1 = [ "7H", "5C", "13D", "12C", "12H" ] // pair
    // const testp2 = [ "7H", "12C", "12H", "5C", "13D" ] // pair
    // const testtp1 = [ "8H", "8C", "12H", "13C", "13D" ] // two pair
    // const testtp2 = [ "7H", "12C", "12H", "5C", "5D" ] // two pair
    // const testtp3 = [ "5H", "7C", "12H", "7C", "5D" ] // two pair
    // const testt1 = [ "7H", "5C", "12D", "12C", "12H" ] // trip
    // const testt2 = [ "7H", "12D", "12C", "12H", "5C" ] // trip
    // const testt3 = [ "7H", "12D", "12C", "5C", "12H" ] // trip
    // const testq1 = [ "7H", "12D", "12C", "12S", "12H" ] // quad
    // const testq2 = [ "12D", "12C", "12S", "12H", "7H" ] // quad
    // const testfh1 = [ "7C", "12C", "12S", "12H", "7H" ] // fh
    // const testfh2 = [ "12D", "12C", "12S", "7C", "7H" ] // fh
    // const testfh3 = [ "12D", "12C", "7C", "12H", "7H" ] // fh

    // const testfl1 = [ "11C", "12C", "7C", "8C", "5C" ] // flush
    // const testfl2 = [ "11C", "12C", "7C", "8C", "5H" ] // flush almost
    // const tests1 = [ "11C", "12S", "10C", "8C", "9H" ] // straight
    // const tests2 = [ "8C", "9C", "10C", "11C", "11H" ] // straight almost
    // const tests3 = [ "11C", "12C", "10C", "8C", "9C" ] // straight flush

    // const rankMain = getRanking([ "12D", "12C", "11S", "12H", "7H" ]);
    // const rankOne = getRanking([ "12D", "12C", "12S", "12H", "7H" ]);
    // const rankTwo = getRanking([ "12D", "12C", "12S", "12H", "7H" ]); 
    // const rankThree = getRanking([ "12D", "12C", "11S", "12H", "7H" ]); 
    
    // ----------------------------------------------------------------------------- 
    // REAL HAND RANKINGS, not test
    // get hand rankings
    const rankMain = getRanking(numMain);
    const rankOne = getRanking(numOne);
    const rankTwo = getRanking(numTwo);
    const rankThree = getRanking(numThree);
    
    // ----------------------------------------------------------------------------- 
    
    const rankAll = [rankMain, rankOne, rankTwo, rankThree];
    const rankArray = [rankMain[0], rankOne[0], rankTwo[0], rankThree[0]];
    const rankArrayConflict = [rankMain[1], rankOne[1], rankTwo[1], rankThree[1]];
    const maxRank = Math.max(...rankArray);
    const maxRankConflict = Math.max(...rankArrayConflict);
    const winMax = [maxRank, maxRankConflict]

    console.log("winMax:", winMax);

    const rankWinnerIndexes = rankArray.filter((playerRank) => {
      return maxRank == playerRank;
    })

    const sendWinner = (indexOfWinner) => {
      const text = document.querySelector('.board__mid-area__mid__text');
      text.textContent = "";
      switch (indexOfWinner) {
        case 0:
          this.winner = "main";
          this.pMain.winner.toggle("winner");
          text.textContent = "You have won!";
          break;

        case 1:
          this.winner = "top";
          this.pOne.winner.toggle("winner");
          text.textContent = "Opposite player has won!";
          break;

        case 2:
          this.winner = "left";
          this.pTwo.winner.toggle("winner");
          text.textContent = "Left player has won!";
          break;
          
        case 3:
          this.winner = "right";
          this.pThree.winner.toggle("winner");
          text.textContent = "Right player has won!";
          break;
      
        default:
          break;
      }
    }

    const sendDraw = () => {
      const text = document.querySelector('.board__mid-area__mid__text');
      text.textContent = "";
      this.draw.forEach((indexOfWinner) => {
        switch (indexOfWinner) {
          case 0:
            this.winner = "main";
            this.pMain.winner.toggle("winner");
            text.textContent += "You, "
            break;
  
          case 1:
            this.winner = "top";
            this.pOne.winner.toggle("winner");
            text.textContent += "Opposite player, "
            break;
  
          case 2:
            this.winner = "left";
            this.pTwo.winner.toggle("winner");
            text.textContent += "Left player, "
            break;
            
          case 3:
            this.winner = "right";
            this.pThree.winner.toggle("winner");
            text.textContent += "Right player, "
            break;
        
          default:
            break;
        }
      })
      text.textContent += "have drawn!"
      
    }

    // no conflict in winner rank
    if (rankWinnerIndexes.length == 1) {
      sendWinner(rankArray.indexOf(maxRank));
    } else if (rankWinnerIndexes.length == 2) {
      // conflict in winner rank, 2 winners
      const firstWinner = rankArray.indexOf(maxRank);
      const secondWinner = rankArray.indexOf(maxRank, firstWinner+1)
      const winnerIndexes = [firstWinner, secondWinner];

      let winnerRanks = [];
      for (let i = 0; i < winnerIndexes.length; i++) {
        if (winnerIndexes[i] == 0) {
          winnerRanks.push(rankMain);
        } else if (winnerIndexes[i] == 1) {
          winnerRanks.push(rankOne);
        } else if (winnerIndexes[i] == 2) {
          winnerRanks.push(rankTwo);
        } else if (winnerIndexes[i] == 3) {
          winnerRanks.push(rankThree);
        } else {
          winnerRanks = winnerRanks;
        }
      }

      // compare the two winners' second item
      // slightly different if two pairs
      if (winnerRanks[0][0] == 3) {
        // two pair
        if (winnerRanks[0][2] > winnerRanks[1][2]) {
          // index 0 of rankWinnerIndexes wins
          sendWinner(firstWinner);
        } else if (winnerRanks[1][2] > winnerRanks[0][2]) {
          sendWinner(secondWinner);
        } else {
          // draw, send draw to indicate who to split between
          let drawWinners = [];
          for (let i = 0; i < rankAll.length; i++) {
            if (rankAll[i][0] == winMax[0] && rankAll[i][1] == winMax[1] && rankAll[i][2] == winnerRanks[0][2]) {
              drawWinners.push(i);
            }
          }
          this.draw = drawWinners;
          sendDraw();
        }
      } else {
        if (winnerRanks[0][1] > winnerRanks[1][1]) {
          // index 0 of rankWinnerIndexes wins
          sendWinner(firstWinner);
        } else if (winnerRanks[1][1] > winnerRanks[0][1]) {
          sendWinner(secondWinner);
        } else {
          // draw, send draw to indicate who to split between
          let drawWinners = [];
          for (let i = 0; i < rankAll.length; i++) {
            if (rankAll[i][0] == winMax[0] && rankAll[i][1] == winMax[1]) {
              drawWinners.push(i);
            }
          }
          this.draw = drawWinners;
          sendDraw();
        }
      }

    } else if (rankWinnerIndexes.length == 3) {
      // conflict in winner rank, 2 winners
      const firstWinner = rankArray.indexOf(maxRank);
      const secondWinner = rankArray.indexOf(maxRank, firstWinner+1)
      const thirdWinner = rankArray.indexOf(maxRank, secondWinner+1)
      const winnerIndexes = [firstWinner, secondWinner, thirdWinner];

      let winnerRanks = [];
      for (let i = 0; i < winnerIndexes.length; i++) {
        if (winnerIndexes[i] == 0) {
          winnerRanks.push(rankMain);
        } else if (winnerIndexes[i] == 1) {
          winnerRanks.push(rankOne);
        } else if (winnerIndexes[i] == 2) {
          winnerRanks.push(rankTwo);
        } else if (winnerIndexes[i] == 3) {
          winnerRanks.push(rankThree);
        } else {
          winnerRanks = winnerRanks;
        }
      }

      // compare the three winners' second item
      // slightly different if two pairs
      if (winnerRanks[0][0] == 3) {
        // two pair
        if (winnerRanks[0][2] > winnerRanks[1][2] && winnerRanks[0][2] > winnerRanks[2][2]) {
          // index 0 of rankWinnerIndexes wins
          sendWinner(firstWinner);
        } else if (winnerRanks[1][2] > winnerRanks[0][2] && winnerRanks[1][2] > winnerRanks[2][2]) {
          sendWinner(secondWinner);
        } else if (winnerRanks[2][2] > winnerRanks[0][2] && winnerRanks[2][2] > winnerRanks[1][2]) {
          sendWinner(thirdWinner);
        } else {
          // draw, send draw to indicate who to split between
          let hcArr = [winnerRanks[0][2], winnerRanks[1][2], winnerRanks[2][2]];
          console.log(hcArr);
          let drawWinners = [];
          for (let i = 0; i < rankAll.length; i++) {
            if (rankAll[i][0] == winMax[0] && rankAll[i][1] == winMax[1] && rankAll[i][2] == winnerRanks[0][2]) {
              drawWinners.push(i);
            }
          }
          this.draw = drawWinners;
          sendDraw();
        }
      } else {
        if (winnerRanks[0][1] > winnerRanks[1][1] && winnerRanks[0][1] > winnerRanks[2][1]) {
          // index 0 of rankWinnerIndexes wins
          sendWinner(firstWinner);
        } else if (winnerRanks[1][1] > winnerRanks[0][1] && winnerRanks[1][1] > winnerRanks[2][1]) {
          sendWinner(secondWinner);
        } else if (winnerRanks[2][1] > winnerRanks[0][1] && winnerRanks[2][1] > winnerRanks[1][1]) {
          sendWinner(thirdWinner);
        } else {
          // draw, send draw to indicate who to split between
          let drawWinners = [];
          for (let i = 0; i < rankAll.length; i++) {
            if (rankAll[i][0] == winMax[0] && rankAll[i][1] == winMax[1]) {
              drawWinners.push(i);
            }
          }
          this.draw = drawWinners;
          sendDraw();
        }
      } 
    } else if (rankWinnerIndexes.length == 4) {
      // conflict in winner rank, 2 winners
      const firstWinner = rankArray.indexOf(maxRank);
      const secondWinner = rankArray.indexOf(maxRank, firstWinner+1);
      const thirdWinner = rankArray.indexOf(maxRank, secondWinner+1);
      const fourthWinner = rankArray.indexOf(maxRank, thirdWinner+1);
      const winnerIndexes = [firstWinner, secondWinner, thirdWinner, fourthWinner];

      let winnerRanks = [];
      for (let i = 0; i < winnerIndexes.length; i++) {
        if (winnerIndexes[i] == 0) {
          winnerRanks.push(rankMain);
        } else if (winnerIndexes[i] == 1) {
          winnerRanks.push(rankOne);
        } else if (winnerIndexes[i] == 2) {
          winnerRanks.push(rankTwo);
        } else if (winnerIndexes[i] == 3) {
          winnerRanks.push(rankThree);
        } else {
          winnerRanks = winnerRanks;
        }
      }

      // compare the four winners' second item
      // slightly different if two pairs
      if (winnerRanks[0][0] == 3) {
        // two pair
        if (winnerRanks[0][2] > winnerRanks[1][2] && winnerRanks[0][2] > winnerRanks[2][2] && winnerRanks[0][2] > winnerRanks[3][2]) {
          // index 0 of rankWinnerIndexes wins
          sendWinner(firstWinner);
        } else if (winnerRanks[1][2] > winnerRanks[0][2] && winnerRanks[1][2] > winnerRanks[2][2] && winnerRanks[1][2] > winnerRanks[3][2]) {
          sendWinner(secondWinner);
        } else if (winnerRanks[2][2] > winnerRanks[0][2] && winnerRanks[2][2] > winnerRanks[1][2] && winnerRanks[2][2] > winnerRanks[3][2]) {
          sendWinner(thirdWinner);
        } else if (winnerRanks[3][2] > winnerRanks[0][2] && winnerRanks[3][2] > winnerRanks[1][2] && winnerRanks[3][2] > winnerRanks[2][2]) {
          sendWinner(fourthWinner);
        } else {
          // draw, send draw to indicate who to split between
          let drawWinners = [];
          for (let i = 0; i < rankAll.length; i++) {
            if (rankAll[i][0] == winMax[0] && rankAll[i][1] == winMax[1] && rankAll[i][2] == winnerRanks[0][2]) {
              drawWinners.push(i)
            }
          }
          this.draw = drawWinners;
          sendDraw();
        }
      } else {
        if (winnerRanks[0][1] > winnerRanks[1][1] && winnerRanks[0][1] > winnerRanks[2][1] && winnerRanks[0][1] > winnerRanks[3][1]) {
          // index 0 of rankWinnerIndexes wins
          sendWinner(firstWinner);
        } else if (winnerRanks[1][1] > winnerRanks[0][1] && winnerRanks[1][1] > winnerRanks[2][1] && winnerRanks[1][1] > winnerRanks[3][1]) {
          sendWinner(secondWinner);
        } else if (winnerRanks[2][1] > winnerRanks[0][1] && winnerRanks[2][1] > winnerRanks[1][1] && winnerRanks[2][1] > winnerRanks[3][1]) {
          sendWinner(thirdWinner);
        } else if (winnerRanks[3][1] > winnerRanks[0][1] && winnerRanks[3][1] > winnerRanks[1][1] && winnerRanks[3][1] > winnerRanks[2][1]) {
          sendWinner(fourthWinner);
        } else {
          // draw, send draw to indicate who to split between
          let drawWinners = [];
          for (let i = 0; i < rankAll.length; i++) {
            if (rankAll[i][0] == winMax[0] && rankAll[i][1] == winMax[1]) {
              drawWinners.push(i);
            }
          }
          this.draw = drawWinners;
          sendDraw();
        }
      }
    }


    console.log("rankArr", rankArray);
    console.log("rankWinInd", rankWinnerIndexes);
    
    // give/take coins

  }

  setCoins(coins) {
    this.heldCoins = coins;
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
    this.pot = ante * 4;
    coins.textContent = this.pot;

    this.setCoins(this.heldCoins-=ante);
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



const play = new Game();






