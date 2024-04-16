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
exports.cmsUpdate = void 0;
const shared_1 = require("@sitechtimes/shared");
const role_1 = require("../../models/cms/role");
const draftStatus_1 = require("../../models/cms/draftStatus");
const draft_1 = require("../../models/cms/draft");
const db_1 = require("../../db");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const cmsUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDatabase)();
        const draft = yield draft_1.Draft.findById(req.params.id);
        if (!draft) {
            throw new shared_1.NotFoundError();
        }
        if (draft.userId !== req.currentUser.id && req.currentUser.role === role_1.Role.Writer) {
            throw new shared_1.NotAuthorizedError();
        }
        // draft - for writer
        if (draft.userId == req.currentUser.id) {
            // TODO - refactor update logic
            const title = req.body.title == undefined ? draft.title : (0, sanitize_html_1.default)(req.body.title);
            const content = req.body.content == undefined ? draft.content : (0, sanitize_html_1.default)(req.body.content);
            const status = req.body.status == draftStatus_1.DraftStatus.Review ? req.body.status : draft.status;
            const imageUrl = req.body.imageUrl == undefined ? draft.imageUrl : req.body.imageUrl;
            const category = req.body.category == undefined ? draft.category : req.body.category;
            const imageAlt = req.body.imageAlt == undefined ? draft.imageAlt : req.body.imageAlt;
            draft.set({ title, content, status, imageUrl, imageAlt, category });
        }
        // editor - can move to ready and back to draft
        if (req.currentUser.role == role_1.Role.Editor || req.currentUser.role == role_1.Role.Admin && draft.status == draftStatus_1.DraftStatus.Review) {
            if (req.body.status == draftStatus_1.DraftStatus.Ready || draftStatus_1.DraftStatus.Draft) {
                draft.set({
                    status: req.body.status
                });
            }
        }
        // admin
        if (req.currentUser.role == role_1.Role.Admin && draft.status == draftStatus_1.DraftStatus.Ready) {
            if (req.body.status == draftStatus_1.DraftStatus.Draft) {
                draft.set({
                    status: req.body.status
                });
            }
        }
        yield draft.save();
        res.send(draft);
    }
    catch (error) {
        console.log(error);
    }
});
exports.cmsUpdate = cmsUpdate;
