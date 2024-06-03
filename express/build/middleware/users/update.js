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
exports.usersUpdate = void 0;
const shared_1 = require("@sitechtimes/shared");
const user_1 = require("../../models/auth/user");
const role_1 = require("../../models/auth/role");
const usersUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl, role } = req.body;
        const user = yield user_1.User.findById(req.params.id);
        if (!user) {
            throw new shared_1.NotFoundError();
        }
        if (user.id !== req.currentUser.id && req.currentUser.role !== role_1.Role.Admin) {
            throw new shared_1.NotAuthorizedError();
        }
        if (user.id === req.currentUser.id) {
            const image = imageUrl === undefined ? user.imageUrl : imageUrl;
            user.set({ imageUrl: image });
        }
        if (req.currentUser.role === role_1.Role.Admin) {
            const updatedRole = role === undefined ? user.role : role;
            user.set({ role: updatedRole });
        }
        yield user.save();
        res.send(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.usersUpdate = usersUpdate;
