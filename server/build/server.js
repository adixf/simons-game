"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const simonGame_1 = __importDefault(require("./routes/simonGame"));
const PORT = 8080;
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`Received request ${req.method} ${req.url}`);
    next();
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/game', simonGame_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
