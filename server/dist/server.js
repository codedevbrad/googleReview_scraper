"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var add = function (a, b) { return a + b; };
app.get('/', function (req, res, next) {
    var val = add(50, 50);
    console.log(val);
    res.end('hey');
});
app.listen(5000, function () { return console.log('serer started'); });
