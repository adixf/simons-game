"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor(gameId) {
        this.gameId = gameId;
        this.score = 0;
        this.highScore = 0;
        this.sequence = [];
    }
    addToSequence() {
        const options = ['red', 'blue', 'green', 'yellow'];
        const color = options[Math.floor(Math.random() * options.length)];
        this.sequence.push(color);
    }
}
exports.default = Game;
