import mongoose from 'mongoose';
/* import {Category} from "./category";
import {Position} from "./position"; */
import { Schema } from 'mongoose';


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

const homepageSchema = new Schema({
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

export const Homepage = mongoose.model('Homepage', homepageSchema)
