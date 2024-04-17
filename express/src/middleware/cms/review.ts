import {requireAuth, roles} from "@sitechtimes/shared";
import express, {Request, Response} from "express";
import {Draft} from "../../models/cms/draft";
import {DraftStatus} from "../../models/cms/draftStatus";
import {connectToDatabase} from "../../db";



export const  cmsReview = async (req: Request, res: Response) => {

    try {
        await connectToDatabase();

        const drafts = await Draft.find({ status: DraftStatus.Review });
    
        res.send(drafts);
    } catch (error) {
        console.log(error)
    }
};

