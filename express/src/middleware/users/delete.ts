import express, { Request, Response } from 'express';
import {NotAuthorizedError, requireAuth} from "@sitechtimes/shared";
import {User} from "../../models/auth/user";


export const usersDelete = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
    
        if(req.currentUser!.id !== id){
            throw new NotAuthorizedError();
        }
    
        await User.findByIdAndDelete(id);
    
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
    }
    
};

