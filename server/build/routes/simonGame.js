"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const Game_1 = __importDefault(require("../Game"));
const games_1 = __importDefault(require("../games"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const gameId = (0, uuid_1.v4)();
    const game = new Game_1.default(gameId);
    games_1.default.push(game);
    res.json({ gameId });
});
router.post('/compturn', (req, res) => {
    const { gameId } = req.body;
    const game = games_1.default.find(g => g.gameId == gameId);
    game === null || game === void 0 ? void 0 : game.addToSequence();
    res.json({ sequence: game === null || game === void 0 ? void 0 : game.sequence });
});
router.post('/playerturn', (req, res) => {
    const { gameId, color, index } = req.body;
    const game = games_1.default.find(g => g.gameId == gameId);
    console.log(color, game === null || game === void 0 ? void 0 : game.sequence, index);
    const result = color == (game === null || game === void 0 ? void 0 : game.sequence[index]);
    res.json({ result });
});
exports.default = router;
