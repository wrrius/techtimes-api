import express, { Request, Response } from 'express';
import {NotAuthorizedError, NotFoundError, requireAuth} from "@sitechtimes/shared";
import {Draft} from "../../models/cms/draft";
import {Role} from "../../models/cms/role";
import {connectToDatabase} from "../../db";


export const  cmsShow = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        await connectToDatabase();
    
        const draft = await Draft.findById(id);
    
        if (!draft) {
            throw new NotFoundError();
        }
    
        if (draft.userId !== req.currentUser!.id && req.currentUser!.role === Role.Writer) {
            throw new NotAuthorizedError();
        }
    
        res.send(draft);
    } catch (error) {
        console.log(error)
    }
};

