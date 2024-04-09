"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homepage = exports.homepageSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_1 = require("./category");
const position_1 = require("./position");
const homepageSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: category_1.Category,
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
        type: position_1.Position,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
exports.homepageSchema = homepageSchema;
homepageSchema.statics.build = (attrs) => {
    return new Homepage(attrs);
};
mongoose_1.default.deleteModel("Homepage");
const Homepage = mongoose_1.default.model('Homepage', homepageSchema);
exports.Homepage = Homepage;
