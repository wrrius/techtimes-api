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
exports.articlesHomepage = void 0;
const index_1 = require("../../routes/index");
const homepage_ts_1 = require("../../models/articles/homepage.ts");
const articlesHomepage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, index_1.connectToDatabase)();
        const query = {};
        if (req.query.category) {
            query.category = req.query.category.toString();
        }
        if (req.query.position) {
            query.position = req.query.position.toString();
        }
        const homepages = yield homepage_ts_1.Homepage.find(query);
        res.send(homepages);
    }
    catch (error) {
        console.log(error);
    }
});
exports.articlesHomepage = articlesHomepage;
