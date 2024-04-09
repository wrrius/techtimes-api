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
exports.usersIndex = void 0;
const user_1 = require("../../models/users/user");
const role_1 = require("../../models/users/role");
const db_1 = require("../../db");
const usersIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDatabase)();
        const users = yield user_1.User.find({ role: { $ne: role_1.Role.Admin } });
        res.send(users);
    }
    catch (error) {
        console.log(error);
    }
});
exports.usersIndex = usersIndex;
