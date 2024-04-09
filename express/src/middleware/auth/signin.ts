import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from "jsonwebtoken";
import {validateRequest, BadRequestError} from "@sitechtimes/shared";

import {User} from "../../models/auth/user";
import {Password} from "./services/password";
import {connectToDatabase} from "../../db";


export const authSignIn = async (req: Request, res: Response) => {

    try {
    await connectToDatabase();
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const doPasswordsMatch = await Password.compare(existingUser.password, password);

    if (!doPasswordsMatch) {
        throw new BadRequestError('Invalid credentials');
    }

    const payload = {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
    }

    const userJWT = jwt.sign(payload, process.env.JWT_KEY!);

    req.session = {
        jwt: userJWT
    };

    res.status(200).send({
        ...existingUser.toJSON(),
        "token": userJWT
    });
    } catch (error) {
        console.log(error)
    }
    
}