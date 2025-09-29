class Ship {
  constructor(length) {
    if (length <= 0) throw new Error('Length must be > 0');
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.length) this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

module.exports = Ship;
