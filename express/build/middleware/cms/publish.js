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
exports.cmsPublish = void 0;
const shared_1 = require("@sitechtimes/shared");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../../db");
const homepage_1 = require("../../models/cms/homepage");
const article_1 = require("../../models/cms/article");
const position_1 = require("../../models/cms/position");
const draft_1 = require("../../models/cms/draft");
const cmsPublish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDatabase)();
        const draft = yield draft_1.Draft.findById(req.params.id);
        if (!draft) {
            throw new shared_1.NotFoundError();
        }
        const db = mongoose_1.default.connection.db.collection('users');
        const users = yield db.find({ _id: mongoose_1.default.Types.ObjectId(draft.userId) }).toArray();
        if (!users[0]) {
            throw new shared_1.NotFoundError();
        }
        const attrs = {
            title: draft.title,
            content: draft.content,
            imageUrl: draft.imageUrl,
            imageAlt: draft.imageAlt,
            category: draft.category,
            user: {
                id: draft.userId,
                name: users[0].name,
                imageUrl: users[0].imageUrl
            }
        };
        const article = article_1.Article.build(Object.assign({}, attrs));
        yield article.save();
        yield draft_1.Draft.findByIdAndDelete(req.params.id);
        // create homepage article
        const isValidPosition = Object.values(position_1.Position).includes(req.body.position);
        if (isValidPosition) {
            yield homepage_1.Homepage.findOneAndRemove({ position: req.body.position, category: draft.category });
            const homepage = homepage_1.Homepage.build(Object.assign(Object.assign({}, attrs), { position: req.body.position, slug: article.slug }));
            yield homepage.save();
        }
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.cmsPublish = cmsPublish;
