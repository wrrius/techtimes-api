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
exports.cmsNew = void 0;
const draft_1 = require("../../models/cms/draft");
const cmsNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const draft = yield draft_1.Draft.create({
            title: 'Untitled',
            content: 'This is where you should write the content of your article ...',
            userId: req.currentUser.id
        });
        res.status(201).send(draft);
    }
    catch (error) {
        console.log(error);
    }
});
exports.cmsNew = cmsNew;
