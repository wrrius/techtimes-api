import express, { Request, Response } from 'express';
import {requireAuth, roles} from "@sitechtimes/shared";
import {User} from "../../models/auth/user";
import {Role} from "../../models/auth/role";



export const usersIndex = async (req: Request, res: Response) => {

    try {

        const users = await User.find({ role: { $ne: Role.Admin }});
    
        res.send(users);
    } catch (error) {
        console.log(error)
    }
    
};

