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
exports.cmsPublish = void 0;
const shared_1 = require("@sitechtimes/shared");
const homepage_1 = require("../../models/articles/homepage");
const article_1 = require("../../models/articles/article");
const position_1 = require("../../models/cms/position");
const draft_1 = require("../../models/cms/draft");
const user_1 = require("../../models/auth/user");
const cmsPublish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const draft = yield draft_1.Draft.findById(req.params.id);
        if (!draft) {
            throw new shared_1.NotFoundError();
        }
        const users = yield user_1.User.findById(draft.userId);
        const attrs = {
            title: draft.title,
            content: draft.content,
            imageUrl: draft.imageUrl,
            imageAlt: draft.imageAlt,
            category: draft.category,
            user: {
                id: draft.userId,
                name: users.name,
                imageUrl: users.imageUrl
            }
        };
        const article = yield article_1.Article.create(Object.assign({}, attrs));
        yield draft_1.Draft.findByIdAndDelete(req.params.id);
        // create homepage article
        const isValidPosition = Object.values(position_1.Position).includes(req.body.position);
        if (isValidPosition) {
            yield homepage_1.Homepage.findOneAndDelete({ position: req.body.position, category: draft.category });
            yield homepage_1.Homepage.create(Object.assign(Object.assign({}, attrs), { position: req.body.position, slug: article.slug }));
        }
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.cmsPublish = cmsPublish;
