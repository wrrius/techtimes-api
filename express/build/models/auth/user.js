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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const password_1 = require("../../middleware/auth/services/password");
const role_1 = require("./role");
/* interface UserAttrs {
    name: string;
    email: string;
    password: string;
    verificationCode: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    verified: boolean;
    verificationCode: string;
}
 */
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: role_1.Role.Writer,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true,
    },
    verificationCode: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null,
        required: false
    }
});
userSchema.pre('save', function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const hashed = yield password_1.Password.toHash(this.get('password'));
            this.set('password', hashed);
        }
        done();
    });
});
exports.User = mongoose_1.default.model('User', userSchema);
