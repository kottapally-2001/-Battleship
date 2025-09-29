const Ship = require('../ship');

describe('Ship', () => {
  test('creates ship with length and 0 hits', () => {
    const s = new Ship(3);
    expect(s.length).toBe(3);
    expect(s.hits).toBe(0);
  });

  test('hit() increments hits but not beyond length', () => {
    const s = new Ship(2);
    s.hit();
    expect(s.hits).toBe(1);
    s.hit();
    expect(s.hits).toBe(2);
    s.hit(); 
    expect(s.hits).toBe(2);
  });

  test('isSunk returns true only when hits >= length', () => {
    const s = new Ship(2);
    expect(s.isSunk()).toBe(false);
    s.hit();
    expect(s.isSunk()).toBe(false);
    s.hit();
    expect(s.isSunk()).toBe(true);
  });
});
