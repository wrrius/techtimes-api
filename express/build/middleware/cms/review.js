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
exports.cmsReview = void 0;
const draft_1 = require("../../models/cms/draft");
const draftStatus_1 = require("../../models/cms/draftStatus");
const cmsReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drafts = yield draft_1.Draft.find({ status: draftStatus_1.DraftStatus.Review });
        res.send(drafts);
    }
    catch (error) {
        console.log(error);
    }
});
exports.cmsReview = cmsReview;
