import mongoose from 'mongoose';
import {DraftStatus} from "./draftStatus";
import { Category } from "../articles/category"

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
const draftSchema = new mongoose.Schema({
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
        default: DraftStatus.Draft
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: Category.Technology,
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

export const Draft = mongoose.model('Draft', draftSchema)
