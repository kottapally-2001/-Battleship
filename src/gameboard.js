function coordKey([r, c]) {
  return `${r},${c}`;
}

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.ships = []; 
    this.shipPositions = {}; 
    this.missedAttacks = new Set(); 
    this.attacked = new Set(); 
  }

  _inBounds(r, c) {
    return r >= 0 && r < this.size && c >= 0 && c < this.size;
  }

  placeShip(ship, startCoord, direction = 'horizontal') {
    const [r0, c0] = startCoord;
    const positions = [];
    for (let i = 0; i < ship.length; i++) {
      const r = direction === 'horizontal' ? r0 : r0 + i;
      const c = direction === 'horizontal' ? c0 + i : c0;
      if (!this._inBounds(r, c)) throw new Error('Ship placement out of bounds');
      const key = `${r},${c}`;
      if (this.shipPositions[key]) throw new Error('Ship placement overlaps existing ship');
      positions.push(key);
    }
    positions.forEach((k) => (this.shipPositions[k] = ship));
    this.ships.push({ ship, positions });
  }

  receiveAttack(coord) {
    const key = coordKey(coord);
    if (this.attacked.has(key)) {
      return { result: 'already' };
    }
    this.attacked.add(key);
    const ship = this.shipPositions[key];
    if (ship) {
      ship.hit();
      return { result: 'hit', ship };
    } else {
      this.missedAttacks.add(key);
      return { result: 'miss' };
    }
  }

  getMisses() {
    return Array.from(this.missedAttacks);
  }

  allSunk() {
    return this.ships.length > 0 && this.ships.every((entry) => entry.ship.isSunk());
  }
  
  hasShipAt(coord) {
    return !!this.shipPositions[coordKey(coord)];
  }
}

module.exports = Gameboard;
