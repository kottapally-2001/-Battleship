class GameController {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.current = 0; 
  }

  currentPlayer() {
    return this.players[this.current];
  }

  opponentPlayer() {
    return this.players[1 - this.current];
  }

  playTurn(coord) {
    const attacker = this.currentPlayer();
    const defender = this.opponentPlayer();
    let attackResult;
    if (attacker.isComputer) {
      attackResult = attacker.randomAttack(defender.board);
    } else {
      attackResult = attacker.attack(defender.board, coord);
    }
    if (!defender.board.allSunk()) {
      this.current = 1 - this.current;
    }
    return attackResult;
  }

  isGameOver() {
    return this.players.some(p => p.board.allSunk());
  }

  getWinner() {
    if (!this.isGameOver()) return null;
    return this.players.find(p => !p.board.allSunk());
  }
}

module.exports = GameController;
