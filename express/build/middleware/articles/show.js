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
exports.articlesShow = void 0;
const article_1 = require("../../models/articles/article");
const db_1 = require("../../db");
const shared_1 = require("@sitechtimes/shared");
const articlesShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDatabase)();
        const { slug } = req.params;
        const article = yield article_1.Article.findOne({ slug });
        if (!article) {
            throw new shared_1.NotFoundError();
        }
        res.status(200).send(article);
    }
    catch (error) {
        console.log(error);
    }
});
exports.articlesShow = articlesShow;
