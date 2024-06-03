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
exports.authSignIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_1 = require("@sitechtimes/shared");
const user_1 = require("../../models/auth/user");
const password_1 = require("./services/password");
const authSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield user_1.User.findOne({ email });
        if (!existingUser) {
            throw new shared_1.BadRequestError('Invalid credentials');
        }
        const doPasswordsMatch = yield password_1.Password.compare(existingUser.password, password);
        if (!doPasswordsMatch) {
            throw new shared_1.BadRequestError('Invalid credentials');
        }
        const payload = {
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        };
        const userJWT = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
        req.session = {
            jwt: userJWT
        };
        res.status(200).send(Object.assign(Object.assign({}, existingUser.toJSON()), { "token": userJWT }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.authSignIn = authSignIn;
