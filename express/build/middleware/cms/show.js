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
exports.cmsShow = void 0;
const shared_1 = require("@sitechtimes/shared");
const draft_1 = require("../../models/cms/draft");
const role_1 = require("../../models/cms/role");
const cmsShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const draft = yield draft_1.Draft.findById(id);
        if (!draft) {
            throw new shared_1.NotFoundError();
        }
        if (draft.userId !== req.currentUser.id && req.currentUser.role === role_1.Role.Writer) {
            throw new shared_1.NotAuthorizedError();
        }
        res.send(draft);
    }
    catch (error) {
        console.log(error);
    }
});
exports.cmsShow = cmsShow;
