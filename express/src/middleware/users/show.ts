import express, { Request, Response } from 'express';
import {NotFoundError, requireAuth} from "@sitechtimes/shared";
import {User} from "../../models/auth/user";


export const usersShow = async (req: Request, res: Response) => {

    try {

        const user = await User.findById(req.params.id);
    
        if (!user){
            throw new NotFoundError();
        }
    
        res.send(user);
    } catch (error) {
        console.log(error)
    }
    
};

