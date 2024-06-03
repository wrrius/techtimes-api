"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homepage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/* import {Category} from "./category";
import {Position} from "./position"; */
const mongoose_2 = require("mongoose");
/* interface HomepageAttrs {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    user: {
        id: string;
        name: string;
        imageUrl: string;
    },
    position: Position;
    slug: string;
}

interface HomepageModel extends mongoose.Model<HomepageDoc> {
    build(attrs: HomepageAttrs): HomepageDoc;
}

export interface HomepageDoc extends mongoose.Document {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    user: {
        id: string;
        name: string;
        imageUrl: string;
    },
    position: Position;
    slug: string;
} */
const homepageSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        },
    },
    position: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});
exports.Homepage = mongoose_1.default.model('Homepage', homepageSchema);
