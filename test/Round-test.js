const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');
const Turn = require('../src/Turn');

describe('Round', function() {
  it('should be a function', function() {
    const round = new Round();
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    const round = new Round();
    expect(round).to.be.an.instanceof(Round);
  });

  it('should have a count of the turns', function() {
    const round = new Round();
    expect(round.turn).to.equal(0);
  });

  it('should have a currentCard property, which starts as the first card in the Deck', function() {
    const card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const card2 = new Card(2, 'What is a comma-separated list of related values?', ["array", "object", "function"], 'array');
    const card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ["mutator method", "accessor method", "iteration method"], 'mutator method');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    expect(round.currentCard).to.deep.equal(card1);
  });

  it('should update the turn count after taking a turn ', function() {
    const card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const deck = new Deck([card1]);
    const round = new Round(deck);

    expect(round.turn).to.equal(0);
    round.takeTurn('array', card1);
    expect(round.turn).to.equal(1);
  });

  it('should update the current card after taking a turn', function() {
    const card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const card2 = new Card(2, 'What is a comma-separated list of related values?', ["array", "object", "function"], 'array');
    const deck = new Deck([card1, card2]);
    const round = new Round(deck);

    expect(round.returnCurrentCard()).to.deep.equal(card1);
    round.takeTurn('array', card1);
    expect(round.returnCurrentCard()).to.deep.equal(card2);
  });

  it('should update the incorrectGuesses if user makes wrong guess', function() {
    const card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const deck = new Deck([card1]);
    const round = new Round(deck);

    expect(round.incorrectGuesses).to.deep.equal([]);
    round.takeTurn('array', card1);
    expect(round.incorrectGuesses).to.deep.equal(['array']);
  });

  it('should provide feedback on guess', function() {
    const card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const card2 = new Card(2, 'What is a comma-separated list of related values?', ["array", "object", "function"], 'array');
    const deck = new Deck([card1, card2]);
    const round = new Round(deck);

    expect(round.takeTurn('array', card1)).to.equal('incorrect!');
    expect(round.takeTurn('array', card2)).to.equal('correct!');
  });

  it('should calculate the percentage of guesses correct', function() {
    const card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const card2 = new Card(2, 'What is a comma-separated list of related values?', ["array", "object", "function"], 'array');
    const card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ["mutator method", "accessor method", "iteration method"], 'mutator method');
    const card4 = new Card(4, 'What type of prototype method does not modify the existing array but returns a particular representation of the array?', ["mutator method", "accessor method", "iteration method"], "accessor method");
    const deck = new Deck([card1, card2, card3, card4]);
    const round = new Round(deck);

    round.takeTurn('array');
    round.takeTurn('function');
    round.takeTurn('mutator method');
    round.takeTurn('mutator method');
    expect(round.calculatePercentCorrect()).to.equal(25);
  });

  it('should display an end round message', function() {
    const card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const card2 = new Card(2, 'What is a comma-separated list of related values?', ["array", "object", "function"], 'array');
    const deck = new Deck([card1, card2]);
    const round = new Round(deck);

    round.takeTurn('array', card1);
    round.takeTurn('array', card2);
    expect(round.endRound()).to.equal('** Round over! ** You answered 50% of the questions correctly!');
  });

});
