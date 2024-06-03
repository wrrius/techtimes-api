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
exports.cmsDelete = void 0;
const shared_1 = require("@sitechtimes/shared");
const draft_1 = require("../../models/cms/draft");
const cmsDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const draft = yield draft_1.Draft.findByIdAndDelete(req.params.id);
        if (!draft) {
            throw new shared_1.NotFoundError();
        }
        if (draft.userId !== req.currentUser.id) {
            throw new shared_1.NotAuthorizedError();
        }
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
    }
});
exports.cmsDelete = cmsDelete;
