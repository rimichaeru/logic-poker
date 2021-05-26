import {Deck, Player} from "./deck-player.js";

// const htmlReference = { innerHTML: "" };
// const loader = new Loader(htmlReference);


describe("Testing Deck Class", () => {
  it("Should have 52 cards", () => {
    const testDeck = new Deck();
    expect(testDeck.deck.length).toBe(52);
  })

  it('Should deal 1 card', () => {
    const testDeck = new Deck();
    const returnedDeckArr = testDeck.dealCards(testDeck.deck, 1);
    const updatedDeck = returnedDeckArr[0];
    const dealtCards = returnedDeckArr[1];
    expect(dealtCards.length).toBe(1);
  })
  it('Should deal 20 cards', () => {
    const testDeck = new Deck();
    const returnedDeckArr = testDeck.dealCards(testDeck.deck, 20);
    const updatedDeck = returnedDeckArr[0];
    const dealtCards = returnedDeckArr[1];
    expect(dealtCards.length).toBe(20);
  })
  it('Should deal 52 cards', () => {
    const testDeck = new Deck();
    const returnedDeckArr = testDeck.dealCards(testDeck.deck, 52);
    const updatedDeck = returnedDeckArr[0];
    const dealtCards = returnedDeckArr[1];
    expect(dealtCards.length).toBe(52);
  })


  it('Should return the 50 deck cards if 2 are dealt', () => {
    const testDeck = new Deck();
    const returnedDeckArr = testDeck.dealCards(testDeck.deck, 50);
    const updatedDeck = returnedDeckArr[0];
    const dealtCards = returnedDeckArr[1];
    expect(updatedDeck.length).toBe(2);
  })
  it('Should return the 29 deck cards if 23 are dealt', () => {
    const testDeck = new Deck();
    const returnedDeckArr = testDeck.dealCards(testDeck.deck, 23);
    const updatedDeck = returnedDeckArr[0];
    const dealtCards = returnedDeckArr[1];
    expect(updatedDeck.length).toBe(29);
  })
  it('Should return the 0 deck cards if 52 are dealt', () => {
    const testDeck = new Deck();
    const returnedDeckArr = testDeck.dealCards(testDeck.deck, 52);
    const updatedDeck = returnedDeckArr[0];
    const dealtCards = returnedDeckArr[1];
    expect(updatedDeck.length).toBe(0);
  })

  
  
})
