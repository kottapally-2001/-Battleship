const Gameboard = require('../gameboard');
const Ship = require('../ship');

describe('Gameboard', () => {
  test('places ship and marks positions', () => {
    const board = new Gameboard(5);
    const ship = new Ship(3);
    board.placeShip(ship, [0, 0], 'horizontal');
    expect(board.hasShipAt([0,0])).toBe(true);
    expect(board.hasShipAt([0,1])).toBe(true);
    expect(board.hasShipAt([0,2])).toBe(true);
  });

  test('throws on overlapping placement', () => {
    const board = new Gameboard(5);
    board.placeShip(new Ship(3), [0, 0], 'horizontal');
    expect(() => board.placeShip(new Ship(2), [0,1], 'vertical')).toThrow();
  });

  test('throws on out-of-bounds placement', () => {
    const board = new Gameboard(5);
    expect(() => board.placeShip(new Ship(3), [4,4], 'horizontal')).toThrow();
  });

  test('receiveAttack records hit and miss', () => {
    const board = new Gameboard(5);
    const ship = new Ship(2);
    board.placeShip(ship, [1, 1], 'vertical'); 
    const res1 = board.receiveAttack([1,1]);
    expect(res1.result).toBe('hit');
    expect(ship.hits).toBe(1);

    const res2 = board.receiveAttack([0,0]);
    expect(res2.result).toBe('miss');
    expect(board.getMisses()).toContain('0,0');

    const res3 = board.receiveAttack([1,1]);
    expect(res3.result).toBe('already');
    expect(ship.hits).toBe(1); 
  });

  test('allSunk reports correctly', () => {
    const board = new Gameboard(5);
    const s1 = new Ship(1);
    const s2 = new Ship(2);
    board.placeShip(s1, [0,0], 'horizontal');
    board.placeShip(s2, [1,0], 'horizontal');
    board.receiveAttack([0,0]); 
    expect(board.allSunk()).toBe(false);
    board.receiveAttack([1,0]);
    board.receiveAttack([1,1]);
    expect(board.allSunk()).toBe(true);
  });
});
