import express, { Request, Response } from 'express';
import {NotFoundError, requireAuth, NotAuthorizedError} from "@sitechtimes/shared";
import {Draft} from "../../models/cms/draft"
import {connectToDatabase} from "../../db";



export const  cmsDelete = async (req: Request, res: Response) => {

    try {

        const draft = await Draft.findByIdAndDelete(req.params.id);
    
        if (!draft) {
            throw new NotFoundError();
        }
    
        if(draft.userId !== req.currentUser!.id) {
           throw new NotAuthorizedError();
        }
    
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
    }
};

