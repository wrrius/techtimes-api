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
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesIndex = void 0;
const article_1 = require("../../models/articles/article");
const db_1 = require("../../db");
const articlesIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDatabase)();
        let query = {};
        let limit = 20;
        let sortBy = { updatedAt: 1 };
        if (req.query.category) {
            query.category = req.query.category.toString();
        }
        if (req.query.q) {
            limit = Number(req.query.q);
        }
        if (req.query.sort === "dateDes") {
            sortBy = { updatedAt: -1 };
        }
        const articles = yield article_1.Article.find(query).sort(sortBy).limit(limit);
        res.status(200).send(articles);
    }
    catch (error) {
        console.log(error);
    }
});
exports.articlesIndex = articlesIndex;
