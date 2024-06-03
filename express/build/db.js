"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const opts = {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Keep tryings for 45s
            family: 4, // Use IPv4, skip trying IPv6
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        try {
            yield mongoose_1.default.connect('mongodb+srv://admin:TPbdbGHrTzte1QM2@cluster0.flxw2nh.mongodb.net/', opts);
            let db = mongoose_1.default.connection;
            db.on("error", console.error.bind(console, "connection error:"));
            db.once("open", () => {
                console.log("MongoDB connected!");
            });
            console.log(db.collections);
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }
    });
}
exports.connectToDatabase = connectToDatabase;
