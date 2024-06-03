import mongoose from 'mongoose';
import {Password} from "../../middleware/auth/services/password"
import {Role} from "./role";

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
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: Role.Writer,
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

userSchema.pre('save', async function (done){
    if (this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    done();
});

export const User = mongoose.model('User', userSchema)
