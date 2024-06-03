"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draft = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const draftStatus_1 = require("./draftStatus");
const category_1 = require("../articles/category");
/* interface DraftAttrs {
    title: string;
    content: string;
    userId: string;
}

interface DraftModel extends mongoose.Model<DraftDoc> {
    build(attrs: DraftAttrs): DraftDoc;
}

export interface DraftDoc extends mongoose.Document {
    title: string;
    content: string;
    userId: string;
    imageUrl: string;
    imageAlt: string;
    status: DraftStatus;
    category: Category;
}
 */
const draftSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null,
        required: false
    },
    imageAlt: {
        type: String,
        default: null,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: draftStatus_1.DraftStatus.Draft
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: category_1.Category.Technology,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});
/* draftSchema.statics.build = (attrs: DraftAttrs) => {
    return new Draft(attrs);
}; */
exports.Draft = mongoose_1.default.model('Draft', draftSchema);
