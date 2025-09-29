const Gameboard = require('./gameboard');

function coordKey([r, c]) {
  return `${r},${c}`;
}

class Player {
  constructor(name = 'Player', isComputer = false, board = null) {
    this.name = name;
    this.isComputer = isComputer;
    this.board = board || new Gameboard();
    this.shotsTaken = new Set();
  }

  attack(opponentBoard, coord) {
    const key = coordKey(coord);
    if (this.shotsTaken.has(key)) {
      return { result: 'already' };
    }
    this.shotsTaken.add(key);
    return opponentBoard.receiveAttack(coord);
  }

  randomAttack(opponentBoard) {
    if (!this.isComputer) throw new Error('Only computer player uses randomAttack');
    while (true) {
      const r = Math.floor(Math.random() * opponentBoard.size);
      const c = Math.floor(Math.random() * opponentBoard.size);
      const key = coordKey([r, c]);
      if (!this.shotsTaken.has(key)) {
        return this.attack(opponentBoard, [r, c]);
      }
    }
  }
}

module.exports = Player;
