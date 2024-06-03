import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import {User} from "../../models/auth/user";
import {validateRequest, BadRequestError} from "@sitechtimes/shared";
import {Verify} from "./services/verify";

export const authSignUp = async (req: Request, res: Response) => {

    try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email is in use');
    }

    const randString = await Verify.generateToken(email);

    const user = await User.create({ name, email, password, verificationCode: randString });
    await Verify.sendVerificationEmail(email, randString);

    res.status(201).send(user.toJSON());
    } catch (error) {
        console.log(error)
    }
    
};
