"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authVerify = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const user_1 = require("../../models/auth/user");
const shared_1 = require("@sitechtimes/shared");
const db_1 = require("../../db");
const authVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDatabase)();
        const { token } = req.params;
        let user = yield user_1.User.findOne({ verificationCode: token });
        if (!user) {
            throw new shared_1.NotFoundError();
        }
        const d = (0, jsonwebtoken_1.decode)(token);
        if (Date.now() > d.exp * 1000) {
            throw new shared_1.BadRequestError('Token is not valid');
        }
        user.verified = true;
        yield user.save();
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        const userJWT = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY, { expiresIn: '6h' });
        req.session = {
            jwt: userJWT
        };
        res.status(200).send(Object.assign(Object.assign({}, user.toJSON()), { "token": userJWT }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.authVerify = authVerify;
