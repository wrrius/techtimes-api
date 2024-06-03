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
exports.usersShow = void 0;
const shared_1 = require("@sitechtimes/shared");
const user_1 = require("../../models/auth/user");
const usersShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.params.id);
        if (!user) {
            throw new shared_1.NotFoundError();
        }
        res.send(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.usersShow = usersShow;
