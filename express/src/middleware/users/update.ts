import express, { Request, Response } from 'express';
import {NotAuthorizedError, NotFoundError} from "@sitechtimes/shared";
import {User} from "../../models/auth/user";
import {Role} from "../../models/auth/role";


export const usersUpdate = async (req: Request, res: Response) => {

    try {

        const { imageUrl, role } = req.body;
    
        const user = await User.findById(req.params.id);
    
        if (!user){
            throw new NotFoundError();
        }
    
        if (user.id !== req.currentUser!.id && req.currentUser!.role !== Role.Admin ) {
            throw new NotAuthorizedError();
        }
    
        if (user.id === req.currentUser!.id) {
            const image = imageUrl === undefined ? user.imageUrl : imageUrl;
            user.set({ imageUrl: image });
        }
    
        if (req.currentUser!.role === Role.Admin) {
            const updatedRole = role === undefined ? user.role : role;
            user.set({ role: updatedRole });
        }
    
        await user.save();
    
        res.send(user);
    } catch (error) {
        console.log(error)
    }
    
};

