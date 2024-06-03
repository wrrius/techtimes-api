"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const danielShema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    }
});
cont;
danTest = mongoose_2.default.model('danTest', danielShema);
