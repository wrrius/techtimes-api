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
exports.articlesIndex = void 0;
const article_1 = __importDefault(require("../../models/articles/article"));
const mongoose_1 = __importDefault(require("mongoose"));
const articlesIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log();
        yield article_1.default.create({
            title: "article 1",
            content: "content 1",
            imageUrl: "ImageURL 1",
            category: "covid",
            user: {
                id: "id 1",
                name: "name 1",
                imageUrl: "string 1",
            }
        });
        console.log(mongoose_1.default.connection.readyState);
        const articles = yield article_1.default.find({}); //.find(query).sort(sortBy).limit(limit);
        console.log(mongoose_1.default.connection.readyState);
        res.status(200).json(articles);
    }
    catch (error) {
        console.log(error);
    }
});
exports.articlesIndex = articlesIndex;
/* export const articlesIndex = async (req: Request, res: Response) => {
    try {
        // Check the connection status
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database connection is not established');
        }

        // Create a new article
        const ArticleNew = new Article({
            title: "article 1",
            content: "content 1",
            imageUrl: "ImageURL 1",
            category: "covid",
            user: {
                id: "id 1",
                name: "name 1",
                imageUrl: "string 1",
            }
        });

        // Save the new article with detailed error handling
        try {
            await ArticleNew.save();
            console.log('Article saved:', ArticleNew);
        } catch (saveError) {
            console.error('Error saving article:', saveError);
            throw new Error('Failed to save the article');
        }

        // Retrieve all articles
        const articles = await Article.find({});
        console.log('Articles retrieved:', articles.length);

        // Send response with articles
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error:', error);

        // Improved error handling
        res.status(500).json({ message: error.message, error: error.stack });
    }
}; */ 
