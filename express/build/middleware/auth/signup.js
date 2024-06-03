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
exports.authSignUp = void 0;
const user_1 = require("../../models/auth/user");
const shared_1 = require("@sitechtimes/shared");
const verify_1 = require("./services/verify");
const authSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            throw new shared_1.BadRequestError('Email is in use');
        }
        const randString = yield verify_1.Verify.generateToken(email);
        const user = yield user_1.User.create({ name, email, password, verificationCode: randString });
        yield verify_1.Verify.sendVerificationEmail(email, randString);
        res.status(201).send(user.toJSON());
    }
    catch (error) {
        console.log(error);
    }
});
exports.authSignUp = authSignUp;
