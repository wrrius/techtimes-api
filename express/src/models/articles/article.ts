import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/* interface ArticleAttrs {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    user: {
        id: string;
        name: string;
        imageUrl: string;
    }
}

interface ArticleModel extends mongoose.Model<ArticleDoc> {
    build(attrs: ArticleAttrs): ArticleDoc;
}

export interface ArticleDoc extends mongoose.Document {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    user: {
        id: string;
        name: string;
        imageUrl: string;
    },
    slug: string;
}

const articleSchema = new Schema({
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
        }
    },
    slug: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.slug_history;
        }
    }
}); */

const articleSchema = new Schema({
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
        }
    },
    slug: {
        type: String,
        default: null,
        required: false
    }
})

//articleSchema.statics.build = (attrs: ArticleAttrs) => {
//    return new Article(attrs);
//};


export const Article = mongoose.model('Article', articleSchema)
