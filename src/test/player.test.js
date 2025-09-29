const Player = require('../player');
const Gameboard = require('../gameboard');
const Ship = require('../ship');

describe('Player', () => {
  test('attack calls opponent receiveAttack and records shot', () => {
    const p1 = new Player('p1');
    const p2Board = new Gameboard(5);
    p2Board.placeShip(new Ship(1), [0,0], 'horizontal');

    const res = p1.attack(p2Board, [0,0]);
    expect(res.result).toBe('hit');
    expect(p1.shotsTaken.has('0,0')).toBe(true);
  });

  test('computer randomAttack does not repeat and returns result', () => {
    const comp = new Player('AI', true);
    const opponent = new Gameboard(3);
    opponent.placeShip(new Ship(1), [0,0], 'horizontal');
    jest.spyOn(Math, 'random').mockReturnValue(0.01); 

    const res = comp.randomAttack(opponent);
    expect(['hit','miss']).toContain(res.result);
    expect(comp.shotsTaken.size).toBe(1);

    Math.random.mockRestore();
  });
});
