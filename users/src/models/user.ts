import mongoose from 'mongoose';

// TODO: add to shared package
export enum Role {
    Writer = 'writer',
    Editor = 'editor',
    Admin = 'admin'
}

interface UserAttrs {
    name: string;
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: Role;
}

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
        type: Role,
        default: Role.Writer,
        required: true
    },
    unknown: {
        type: String,
        required: true
    }
}, {
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User };
