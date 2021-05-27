"use strict";

var _deckPlayer = require("./deck-player.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);

    this.roundCount = 0;
    this.hasBet = false;
    this.isNewRound = true; // init held coins

    this.heldCoins = 0;
    this.setCoins(3000);
    this.savedCards = []; // set ante
    // init deck and players

    this.pot = 0;
    this.deck = null;
    this.pMain = null;
    this.pOne = null;
    this.pTwo = null;
    this.pThree = null;
    this.newRound(); // Saving backup of main player's cards

    this.savedpMain = this.pMain;
    this.pMain.showCards();
    this.winner = null;
    this.draw = null; // bet event listener

    this.initButtons();
  }

  _createClass(Game, [{
    key: "initButtons",
    value: function initButtons() {
      var _this = this;

      document.querySelector(".betH").addEventListener("click", function () {
        if (_this.hasBet == true) {
          var _audio = new Audio("./assets/slap.wav");

          _audio.play();

          return;
        }

        var audio = new Audio("./assets/shuffle.wav");
        audio.play();
        document.querySelector(".bet-amount").value = Math.floor(_this.pot / 2);

        _this.betAndShow();
      });
      document.querySelector(".bet2").addEventListener("click", function () {
        if (_this.hasBet == true) {
          var _audio2 = new Audio("./assets/slap.wav");

          _audio2.play();

          return;
        }

        var audio = new Audio("./assets/shuffle.wav");
        audio.play();
        document.querySelector(".bet-amount").value = Math.floor(_this.pot * 2);

        _this.betAndShow();
      });
      document.querySelector(".bet3").addEventListener("click", function () {
        if (_this.hasBet == true) {
          var _audio3 = new Audio("./assets/slap.wav");

          _audio3.play();

          return;
        }

        var audio = new Audio("./assets/shuffle.wav");
        audio.play();
        document.querySelector(".bet-amount").value = Math.floor(_this.pot * 3);

        _this.betAndShow();
      });
      document.querySelector(".bet4").addEventListener("click", function () {
        if (_this.hasBet == true) {
          var _audio4 = new Audio("./assets/slap.wav");

          _audio4.play();

          return;
        }

        var audio = new Audio("./assets/shuffle.wav");
        audio.play();
        document.querySelector(".bet-amount").value = Math.floor(_this.pot * 4);

        _this.betAndShow();
      });
      document.querySelector(".send-bet").addEventListener("click", function () {
        if (_this.hasBet == true) {
          var _audio5 = new Audio("./assets/slap.wav");

          _audio5.play();

          return;
        }

        var audio = new Audio("./assets/shuffle.wav");
        audio.play();

        _this.betAndShow();
      });
      document.querySelector(".next-round").addEventListener("click", function () {
        var audio = new Audio("./assets/pop.wav");
        audio.play();

        if (_this.isNewRound == true) {
          return;
        }

        _this.deck = null;

        _this.pMain.winner.toggle("winner", true);

        _this.pOne.winner.toggle("winner", true);

        _this.pTwo.winner.toggle("winner", true);

        _this.pThree.winner.toggle("winner", true);

        _this.pMain.hideCards();

        _this.pOne.hideCards();

        _this.pTwo.hideCards();

        _this.pThree.hideCards();

        var cardGridCards = document.querySelectorAll(".card-grid .card");

        for (var i = 0; i < _this.savedCards.length; i++) {
          cardGridCards[i].id = "";

          if (_this.savedCards[i][_this.savedCards[i].length - 1] == "H") {
            cardGridCards[i].classList = "card";
          } else if (_this.savedCards[i][_this.savedCards[i].length - 1] == "C") {
            cardGridCards[i].classList = "card";
          } else if (_this.savedCards[i][_this.savedCards[i].length - 1] == "S") {
            cardGridCards[i].classList = "card";
          } else {
            cardGridCards[i].classList = "card";
          }

          cardGridCards[i].innerHTML += "<p class=\"u\"></p><div class=\"l\"></div>";
          cardGridCards[i].querySelector(".u").textContent = "";
        }

        _this.savedCards = [];

        _this.newRound(); // Saving backup of main player's cards


        _this.savedpMain = _this.pMain;

        _this.pMain.showCards();

        _this.winner = null;
        _this.draw = null;
        _this.hasBet = false;
        _this.isNewRound = true;
        var cards = document.querySelectorAll(".mainPlayer .card");

        var _loop = function _loop(_i) {
          cards[_i].classList.add("hidden");

          setTimeout(function () {
            cards[_i].classList.add("grow");

            cards[_i].classList.remove("hidden");
          }, _i * 200);

          cards[_i].classList.remove("grow");
        };

        for (var _i = 0; _i < cards.length; _i++) {
          _loop(_i);
        }

        var gridCards = document.querySelectorAll(".card-grid .card");

        for (var _i2 = 0; _i2 < gridCards.length; _i2++) {
          gridCards[_i2].classList.add("hidden");
        }

        setTimeout(function () {
          var _loop2 = function _loop2(_i3) {
            setTimeout(function () {
              gridCards[_i3].classList.add("growQuick");

              gridCards[_i3].classList.remove("hidden");
            }, _i3); //* 140) add to scroll through animations

            gridCards[_i3].classList.remove("growQuick");
          };

          for (var _i3 = 0; _i3 < gridCards.length; _i3++) {
            _loop2(_i3);
          }
        }, 1000);
      });
    }
  }, {
    key: "newRound",
    value: function newRound() {
      this.setAnte();
      this.newDeal();
    }
  }, {
    key: "betAndShow",
    value: function betAndShow() {
      // remove bet amount from held coins
      var betSelector = document.querySelector(".bet-amount");
      var betAmount = betSelector.value;

      if (Number(betAmount) > this.heldCoins || Number(betAmount) % 1 != 0 || Number(betAmount) > this.pot * 4) {
        var modal = document.querySelector(".modal-input"); // For over max bet

        if (Number(betAmount) > this.pot * 4) {
          modal.childNodes[0].value = "Please enter a bet less than 4*pot ".concat(this.pot * 4);
        }

        window.onclick = function (event) {
          if (event.target == modal || event.target == document.querySelector(".app") || event.target == document.querySelector("div")) {
            modal.style.display = "none";
          }
        };

        modal.style.display = "flex";
        setTimeout(function () {
          modal.style.display = "none";
        }, 4000);
        return;
      }

      this.setCoins(this.heldCoins -= betAmount); // add bet amount to pot from all players

      this.pot += betAmount * 4;
      this.decideWinner();
      var text = document.querySelector('.board__mid-area__mid__coins');
      text.textContent = "Reward: ".concat(this.pot, " coins!"); // add to main player

      if (this.winner == "main") {
        window.confetti({
          particleCount: 180,
          spread: 180,
          origin: {
            x: 0.5,
            y: 0.9
          },
          colors: ["#f54242", "#ed28dd", "#22e0da", "#00f228"]
        });
        this.setCoins(this.heldCoins += this.pot);
      } else if (this.draw == null) {} else if (this.draw.includes(0)) {
        console.log("draw with main player!");
        var splitReward = Math.floor(this.pot / this.draw.length);
        this.setCoins(this.heldCoins += splitReward);
        console.log("splitReward = ", splitReward);
      }

      betSelector.value = "";
      this.hasBet = true;
      this.isNewRound = false;
    }
  }, {
    key: "decideWinner",
    value: function decideWinner() {
      var _this2 = this;

      this.pOne.showCards();
      this.pTwo.showCards();
      this.pThree.showCards();

      var getNumberedCards = function getNumberedCards(cardArray) {
        // card to number, for comparisons
        var numberedCards = [];

        for (var i = 0; i < cardArray.length; i++) {
          // get card value and convert to a number for easy comparison
          var currentCardValue = cardArray[i].slice(0, length - 1);

          if (currentCardValue == "J") {
            currentCardValue = 11;
          } else if (currentCardValue == "Q") {
            currentCardValue = 12;
          } else if (currentCardValue == "K") {
            currentCardValue = 13;
          } else if (currentCardValue == "A") {
            currentCardValue = 14;
          } else {
            currentCardValue = Number(currentCardValue);
          }

          numberedCards.push(currentCardValue + cardArray[i][cardArray[i].length - 1]);
        }

        return numberedCards;
      }; // cards are now 14S instead of AS


      var numMain = getNumberedCards(this.pMain.playerHand);
      var numOne = getNumberedCards(this.pOne.playerHand);
      var numTwo = getNumberedCards(this.pTwo.playerHand);
      var numThree = getNumberedCards(this.pThree.playerHand);

      var getRanking = function getRanking(cards) {
        // shorthand for splitting the card number and suit
        var sp = function sp(card) {
          var num = card.slice(0, card.length - 1);
          var suit = card.slice(card.length - 1);
          return [Number(num), suit];
        };

        var getNumberArr = function getNumberArr(playerHand) {
          return playerHand.map(function (card) {
            return sp(card)[0];
          });
        };

        var getSuitArr = function getSuitArr(playerHand) {
          return playerHand.map(function (card) {
            return sp(card)[1];
          });
        }; // ranking result needs to be [rankValue, cardNumber]
        // cardNumber won't always be used, but is needed for comparisons, eg. two people have a pair each, cardNumber shows which is higher


        var rank = [0, 0]; // ranks are updated/replaced as ranking matches are made
        // there are 9 poker card rankings

        var numCards = getNumberArr(cards); // high card

        var hc = Math.max.apply(Math, _toConsumableArray(numCards));
        rank = [1, hc]; // pairs, trips, quads, full house, two pair
        // pair if 1, rank 2
        // two pair if 1 and 1, rank 3
        // trips if 3, rank 4
        // full house if 1 and 3 (or 3 and 1), rank 7
        // quads if 6, rank 8

        var pairs = [];

        for (var _i4 = 0; _i4 < numCards.length - 1; _i4++) {
          var forwardSlice = numCards.slice(_i4 + 1);

          for (var j = 0; j < forwardSlice.length; j++) {
            if (numCards[_i4] == forwardSlice[j]) {
              pairs.push(numCards[_i4]);
              continue;
            }
          }
        } // counting numbers in pairs[]


        var counts = {};

        for (var i = 0; i < pairs.length; i++) {
          var num = pairs[i];
          counts[num] = counts[num] ? counts[num] + 1 : 1;
        } // setting rank for pairs[]


        if (Object.keys(counts).length == 1) {
          // single pair, trip, quad
          var key = Object.keys(counts)[0];
          var occurrence = counts[key];

          if (occurrence == 6) {
            rank = [8, Number(key)];
          } else if (occurrence == 3) {
            rank = [4, Number(key)];
          } else {
            rank = [2, Number(key)];
          }
        } else if (Object.keys(counts).length == 2) {
          // two pair, fh
          var _key = Object.keys(counts); // two item array


          var occurrenceOne = counts[_key[0]];
          var occurrenceTwo = counts[_key[1]];

          if (occurrenceOne == occurrenceTwo) {
            // two pair, format is special; [rank, highPair, lowPair] for comparisons
            rank = [3, Math.max(Number(_key[0]), Number(_key[1])), Math.min(Number(_key[0]), Number(_key[1]))];
          } else {
            rank = [7, Math.max(Number(_key[0]), Number(_key[1]))];
          }
        } else {
          rank = rank;
        } // flush


        var suits = getSuitArr(cards);

        if (suits.every(function (val) {
          return val === suits[0];
        })) {
          rank = [6, Math.max.apply(Math, _toConsumableArray(numCards))];
        } // straight, straight flush
        // sorts cards in order


        var sortCards = function sortCards(inputArr) {
          var len = inputArr.length;
          var swapped;

          do {
            swapped = false;

            for (var _i5 = 0; _i5 < len; _i5++) {
              if (inputArr[_i5] > inputArr[_i5 + 1]) {
                var tmp = inputArr[_i5];
                inputArr[_i5] = inputArr[_i5 + 1];
                inputArr[_i5 + 1] = tmp;
                swapped = true;
              }
            }
          } while (swapped);

          return inputArr;
        };

        var sortedNumCards = sortCards(numCards);
        console.log(sortedNumCards);
        var inOrder = true;

        for (var _i6 = 0; _i6 < sortedNumCards.length - 1; _i6++) {
          if (!(sortedNumCards[_i6] == sortedNumCards[_i6 + 1] - 1)) {
            inOrder = false;
            break;
          }
        }

        if (inOrder == true) {
          if (suits.every(function (val) {
            return val === suits[0];
          })) {
            // straight flush
            rank = [9, Math.max.apply(Math, _toConsumableArray(numCards))];
          } else {
            // straight
            rank = [5, Math.max.apply(Math, _toConsumableArray(numCards))];
          }
        }

        return rank;
      }; // ------------------------------------------------ TESTING
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


      var rankMain = getRanking(numMain);
      var rankOne = getRanking(numOne);
      var rankTwo = getRanking(numTwo);
      var rankThree = getRanking(numThree); // ----------------------------------------------------------------------------- 

      var rankAll = [rankMain, rankOne, rankTwo, rankThree];
      var rankArray = [rankMain[0], rankOne[0], rankTwo[0], rankThree[0]];
      var rankArrayConflict = [rankMain[1], rankOne[1], rankTwo[1], rankThree[1]];
      var maxRank = Math.max.apply(Math, rankArray);
      var maxRankConflict = Math.max.apply(Math, rankArrayConflict);
      var winMax = [maxRank, maxRankConflict];
      console.log("winMax:", winMax);
      var rankWinnerIndexes = rankArray.filter(function (playerRank) {
        return maxRank == playerRank;
      });

      var sendWinner = function sendWinner(indexOfWinner) {
        var text = document.querySelector('.board__mid-area__mid__text');
        text.textContent = "";

        switch (indexOfWinner) {
          case 0:
            _this2.winner = "main";

            _this2.pMain.winner.toggle("winner");

            text.textContent = "You have won!";
            break;

          case 1:
            _this2.winner = "top";

            _this2.pOne.winner.toggle("winner");

            text.textContent = "Opposite player has won!";
            break;

          case 2:
            _this2.winner = "left";

            _this2.pTwo.winner.toggle("winner");

            text.textContent = "Left player has won!";
            break;

          case 3:
            _this2.winner = "right";

            _this2.pThree.winner.toggle("winner");

            text.textContent = "Right player has won!";
            break;

          default:
            break;
        }
      };

      var sendDraw = function sendDraw() {
        var text = document.querySelector('.board__mid-area__mid__text');
        text.textContent = "";

        _this2.draw.forEach(function (indexOfWinner) {
          switch (indexOfWinner) {
            case 0:
              _this2.winner = "main";

              _this2.pMain.winner.toggle("winner");

              text.textContent += "You, ";
              break;

            case 1:
              _this2.winner = "top";

              _this2.pOne.winner.toggle("winner");

              text.textContent += "Opposite player, ";
              break;

            case 2:
              _this2.winner = "left";

              _this2.pTwo.winner.toggle("winner");

              text.textContent += "Left player, ";
              break;

            case 3:
              _this2.winner = "right";

              _this2.pThree.winner.toggle("winner");

              text.textContent += "Right player, ";
              break;

            default:
              break;
          }
        });

        text.textContent += "have drawn!";
      }; // no conflict in winner rank


      if (rankWinnerIndexes.length == 1) {
        sendWinner(rankArray.indexOf(maxRank));
      } else if (rankWinnerIndexes.length == 2) {
        // conflict in winner rank, 2 winners
        var firstWinner = rankArray.indexOf(maxRank);
        var secondWinner = rankArray.indexOf(maxRank, firstWinner + 1);
        var winnerIndexes = [firstWinner, secondWinner];
        var winnerRanks = [];

        for (var i = 0; i < winnerIndexes.length; i++) {
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
        } // compare the two winners' second item
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
            var drawWinners = [];

            for (var _i7 = 0; _i7 < rankAll.length; _i7++) {
              if (rankAll[_i7][0] == winMax[0] && rankAll[_i7][1] == winMax[1] && rankAll[_i7][2] == winnerRanks[0][2]) {
                drawWinners.push(_i7);
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
            var _drawWinners = [];

            for (var _i8 = 0; _i8 < rankAll.length; _i8++) {
              if (rankAll[_i8][0] == winMax[0] && rankAll[_i8][1] == winMax[1]) {
                _drawWinners.push(_i8);
              }
            }

            this.draw = _drawWinners;
            sendDraw();
          }
        }
      } else if (rankWinnerIndexes.length == 3) {
        // conflict in winner rank, 2 winners
        var _firstWinner = rankArray.indexOf(maxRank);

        var _secondWinner = rankArray.indexOf(maxRank, _firstWinner + 1);

        var thirdWinner = rankArray.indexOf(maxRank, _secondWinner + 1);
        var _winnerIndexes = [_firstWinner, _secondWinner, thirdWinner];
        var _winnerRanks = [];

        for (var _i9 = 0; _i9 < _winnerIndexes.length; _i9++) {
          if (_winnerIndexes[_i9] == 0) {
            _winnerRanks.push(rankMain);
          } else if (_winnerIndexes[_i9] == 1) {
            _winnerRanks.push(rankOne);
          } else if (_winnerIndexes[_i9] == 2) {
            _winnerRanks.push(rankTwo);
          } else if (_winnerIndexes[_i9] == 3) {
            _winnerRanks.push(rankThree);
          } else {
            _winnerRanks = _winnerRanks;
          }
        } // compare the three winners' second item
        // slightly different if two pairs


        if (_winnerRanks[0][0] == 3) {
          // two pair
          if (_winnerRanks[0][2] > _winnerRanks[1][2] && _winnerRanks[0][2] > _winnerRanks[2][2]) {
            // index 0 of rankWinnerIndexes wins
            sendWinner(_firstWinner);
          } else if (_winnerRanks[1][2] > _winnerRanks[0][2] && _winnerRanks[1][2] > _winnerRanks[2][2]) {
            sendWinner(_secondWinner);
          } else if (_winnerRanks[2][2] > _winnerRanks[0][2] && _winnerRanks[2][2] > _winnerRanks[1][2]) {
            sendWinner(thirdWinner);
          } else {
            // draw, send draw to indicate who to split between
            var hcArr = [_winnerRanks[0][2], _winnerRanks[1][2], _winnerRanks[2][2]];
            console.log(hcArr);
            var _drawWinners2 = [];

            for (var _i10 = 0; _i10 < rankAll.length; _i10++) {
              if (rankAll[_i10][0] == winMax[0] && rankAll[_i10][1] == winMax[1] && rankAll[_i10][2] == _winnerRanks[0][2]) {
                _drawWinners2.push(_i10);
              }
            }

            this.draw = _drawWinners2;
            sendDraw();
          }
        } else {
          if (_winnerRanks[0][1] > _winnerRanks[1][1] && _winnerRanks[0][1] > _winnerRanks[2][1]) {
            // index 0 of rankWinnerIndexes wins
            sendWinner(_firstWinner);
          } else if (_winnerRanks[1][1] > _winnerRanks[0][1] && _winnerRanks[1][1] > _winnerRanks[2][1]) {
            sendWinner(_secondWinner);
          } else if (_winnerRanks[2][1] > _winnerRanks[0][1] && _winnerRanks[2][1] > _winnerRanks[1][1]) {
            sendWinner(thirdWinner);
          } else {
            // draw, send draw to indicate who to split between
            var _drawWinners3 = [];

            for (var _i11 = 0; _i11 < rankAll.length; _i11++) {
              if (rankAll[_i11][0] == winMax[0] && rankAll[_i11][1] == winMax[1]) {
                _drawWinners3.push(_i11);
              }
            }

            this.draw = _drawWinners3;
            sendDraw();
          }
        }
      } else if (rankWinnerIndexes.length == 4) {
        // conflict in winner rank, 2 winners
        var _firstWinner2 = rankArray.indexOf(maxRank);

        var _secondWinner2 = rankArray.indexOf(maxRank, _firstWinner2 + 1);

        var _thirdWinner = rankArray.indexOf(maxRank, _secondWinner2 + 1);

        var fourthWinner = rankArray.indexOf(maxRank, _thirdWinner + 1);
        var _winnerIndexes2 = [_firstWinner2, _secondWinner2, _thirdWinner, fourthWinner];
        var _winnerRanks2 = [];

        for (var _i12 = 0; _i12 < _winnerIndexes2.length; _i12++) {
          if (_winnerIndexes2[_i12] == 0) {
            _winnerRanks2.push(rankMain);
          } else if (_winnerIndexes2[_i12] == 1) {
            _winnerRanks2.push(rankOne);
          } else if (_winnerIndexes2[_i12] == 2) {
            _winnerRanks2.push(rankTwo);
          } else if (_winnerIndexes2[_i12] == 3) {
            _winnerRanks2.push(rankThree);
          } else {
            _winnerRanks2 = _winnerRanks2;
          }
        } // compare the four winners' second item
        // slightly different if two pairs


        if (_winnerRanks2[0][0] == 3) {
          // two pair
          if (_winnerRanks2[0][2] > _winnerRanks2[1][2] && _winnerRanks2[0][2] > _winnerRanks2[2][2] && _winnerRanks2[0][2] > _winnerRanks2[3][2]) {
            // index 0 of rankWinnerIndexes wins
            sendWinner(_firstWinner2);
          } else if (_winnerRanks2[1][2] > _winnerRanks2[0][2] && _winnerRanks2[1][2] > _winnerRanks2[2][2] && _winnerRanks2[1][2] > _winnerRanks2[3][2]) {
            sendWinner(_secondWinner2);
          } else if (_winnerRanks2[2][2] > _winnerRanks2[0][2] && _winnerRanks2[2][2] > _winnerRanks2[1][2] && _winnerRanks2[2][2] > _winnerRanks2[3][2]) {
            sendWinner(_thirdWinner);
          } else if (_winnerRanks2[3][2] > _winnerRanks2[0][2] && _winnerRanks2[3][2] > _winnerRanks2[1][2] && _winnerRanks2[3][2] > _winnerRanks2[2][2]) {
            sendWinner(fourthWinner);
          } else {
            // draw, send draw to indicate who to split between
            var _drawWinners4 = [];

            for (var _i13 = 0; _i13 < rankAll.length; _i13++) {
              if (rankAll[_i13][0] == winMax[0] && rankAll[_i13][1] == winMax[1] && rankAll[_i13][2] == _winnerRanks2[0][2]) {
                _drawWinners4.push(_i13);
              }
            }

            this.draw = _drawWinners4;
            sendDraw();
          }
        } else {
          if (_winnerRanks2[0][1] > _winnerRanks2[1][1] && _winnerRanks2[0][1] > _winnerRanks2[2][1] && _winnerRanks2[0][1] > _winnerRanks2[3][1]) {
            // index 0 of rankWinnerIndexes wins
            sendWinner(_firstWinner2);
          } else if (_winnerRanks2[1][1] > _winnerRanks2[0][1] && _winnerRanks2[1][1] > _winnerRanks2[2][1] && _winnerRanks2[1][1] > _winnerRanks2[3][1]) {
            sendWinner(_secondWinner2);
          } else if (_winnerRanks2[2][1] > _winnerRanks2[0][1] && _winnerRanks2[2][1] > _winnerRanks2[1][1] && _winnerRanks2[2][1] > _winnerRanks2[3][1]) {
            sendWinner(_thirdWinner);
          } else if (_winnerRanks2[3][1] > _winnerRanks2[0][1] && _winnerRanks2[3][1] > _winnerRanks2[1][1] && _winnerRanks2[3][1] > _winnerRanks2[2][1]) {
            sendWinner(fourthWinner);
          } else {
            // draw, send draw to indicate who to split between
            var _drawWinners5 = [];

            for (var _i14 = 0; _i14 < rankAll.length; _i14++) {
              if (rankAll[_i14][0] == winMax[0] && rankAll[_i14][1] == winMax[1]) {
                _drawWinners5.push(_i14);
              }
            }

            this.draw = _drawWinners5;
            sendDraw();
          }
        }
      }

      console.log("rankArr", rankArray);
      console.log("rankWinInd", rankWinnerIndexes); // give/take coins
    }
  }, {
    key: "setCoins",
    value: function setCoins(coins) {
      this.heldCoins = coins;
      var displayedCoins = document.querySelector(".coin-amount");
      displayedCoins.textContent = this.heldCoins;
    }
  }, {
    key: "setAnte",
    value: function setAnte() {
      // --------------- ANTE
      // randomises ante amount for players to chip in EACH
      var radioLow = document.querySelector("#low");
      var radioMid = document.querySelector("#mid");
      var radioHigh = document.querySelector("#high");
      var radioCheckMult = 1;
      var radioCheckAdd = 1;

      if (radioHigh.checked) {
        // high
        radioCheckMult = 4;
        radioCheckAdd = Math.floor(Math.random() * 50) + 38;
        ;
        document.querySelector(".coin-img").src = "./assets/coins_high.png";
      } else if (radioMid.checked) {
        // mid
        radioCheckMult = 2;
        radioCheckAdd = Math.floor(Math.random() * 26) + 16;
        ;
        document.querySelector(".coin-img").src = "./assets/coins_mid.png";
      } else if (radioLow.checked) {
        // low
        radioCheckMult = 1;
        radioCheckAdd = 1;
        document.querySelector(".coin-img").src = "./assets/coins_low.png";
      } else {
        radioCheckMult = 1;
        radioCheckAdd = 1;
        document.querySelector(".coin-img").src = "./assets/coins_low.png";
      } // base ante between 20 and 80


      var baseAmount = Math.floor(Math.random() * 80) + 40;
      var rounded = document.querySelector('#rounded');
      var ante = 0;

      if (rounded.checked) {
        ante = Math.round((baseAmount + radioCheckAdd) * radioCheckMult / 10 / 4) * 10;
      } else {
        ante = Math.round((baseAmount + radioCheckAdd) * radioCheckMult / 4);
      }

      var coins = document.querySelector('.board__mid-area__mid__coins');
      var text = document.querySelector('.board__mid-area__mid__text');
      text.textContent = "Each player covers the ".concat(ante, " coin ante.");
      this.pot = ante * 4;
      coins.textContent = this.pot;
      this.setCoins(this.heldCoins -= ante);
    }
  }, {
    key: "newDeal",
    value: function newDeal() {
      // creates a fresh deck in .deck
      var deckInst = new _deckPlayer.Deck(); // deals 20 random cards for the play as the activeCards

      var activeCardsArr = deckInst.dealCards(deckInst.deck, 20);
      var activeCards = activeCardsArr[1];
      console.log("activeCards:", activeCards, deckInst); // creates each player;

      this.pMain = new _deckPlayer.Player("mainPlayer", activeCards, deckInst);
      activeCards = this.pMain.activeCards; // saved cards are also the cards displayed

      this.savedCards = activeCards;
      this.pOne = new _deckPlayer.Player("topPlayer", activeCards, deckInst);
      activeCards = this.pOne.activeCards;
      this.pTwo = new _deckPlayer.Player("leftPlayer", activeCards, deckInst);
      activeCards = this.pTwo.activeCards;
      this.pThree = new _deckPlayer.Player("rightPlayer", activeCards, deckInst);
      activeCards = this.pThree.activeCards;
      console.log(this.pOne.playerHand);
      console.log(this.pTwo.playerHand);
      console.log(this.pThree.playerHand);
      console.log(this.pMain.playerHand);
      console.log("Must be an empty arr after dealing - activeCards: ", activeCards); // ORDERING GRID CARDS FIRST

      var orderCards = function orderCards(cardArray) {
        var orderedSavedCards = [];

        for (var i = 0; i < cardArray.length; i++) {
          // get card value and convert to a number for easy comparison
          var currentCardValue = cardArray[i].slice(0, length - 1);

          if (currentCardValue == "J") {
            currentCardValue = 11;
          } else if (currentCardValue == "Q") {
            currentCardValue = 12;
          } else if (currentCardValue == "K") {
            currentCardValue = 13;
          } else if (currentCardValue == "A") {
            currentCardValue = 14;
          } else {
            currentCardValue = Number(currentCardValue);
          }

          orderedSavedCards.push(currentCardValue + cardArray[i][cardArray[i].length - 1]);
        }

        var sortCards = function sortCards(inputArr) {
          var getVal = function getVal() {
            var arrayItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            return Number(arrayItem.slice(0, arrayItem.length - 1));
          };

          var len = inputArr.length;
          var swapped;

          do {
            swapped = false;

            for (var _i15 = 0; _i15 < len; _i15++) {
              if (getVal(inputArr[_i15]) > getVal(inputArr[_i15 + 1])) {
                var tmp = inputArr[_i15];
                inputArr[_i15] = inputArr[_i15 + 1];
                inputArr[_i15 + 1] = tmp;
                swapped = true;
              }
            }
          } while (swapped);

          return inputArr;
        }; // call the card sort


        orderedSavedCards = sortCards(orderedSavedCards);
        orderedSavedCards.shift(); //removes first undefined item from the card sort
        // change numbers back into Ace/King/Queen/Jack

        var reversedOrderedCards = [];

        for (var _i16 = 0; _i16 < orderedSavedCards.length; _i16++) {
          var currentCardValue = orderedSavedCards[_i16].slice(0, length - 1);

          if (currentCardValue == "11") {
            currentCardValue = "J";
          } else if (currentCardValue == "12") {
            currentCardValue = "Q";
          } else if (currentCardValue == "13") {
            currentCardValue = "K";
          } else if (currentCardValue == "14") {
            currentCardValue = "A";
          } else {
            currentCardValue = currentCardValue;
          }

          reversedOrderedCards.push(currentCardValue + orderedSavedCards[_i16][orderedSavedCards[_i16].length - 1]);
        } // currently sort is low to high, reverse it to show high cards first


        return reversedOrderedCards.reverse();
      };

      this.savedCards = orderCards(this.savedCards);
      var cardGridCards = document.querySelectorAll(".card-grid .card");

      for (var i = 0; i < this.savedCards.length; i++) {
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

        cardGridCards[i].innerHTML += "<p class=\"u\"></p><div class=\"l\"></div>";
        cardGridCards[i].querySelector(".u").textContent = this.savedCards[i].slice(0, length - 1);
      }
    }
  }]);

  return Game;
}();

var play = new Game();