import express, { Request, Response } from 'express';
import {requireAuth, roles} from "@sitechtimes/shared";
import {User} from "../../models/users/user";
import {Role} from "../../models/users/role";
import {connectToDatabase} from "../../db";


export const usersIndex = async (req: Request, res: Response) => {

    try {
        await connectToDatabase();

        const users = await User.find({ role: { $ne: Role.Admin }});
    
        res.send(users);
    } catch (error) {
        console.log(error)
    }
    
};

