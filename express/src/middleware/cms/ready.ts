import express, {Request, Response} from "express";
import {requireAuth, roles} from "@sitechtimes/shared";
import {Draft} from "../../models/cms/draft";
import {DraftStatus} from "../../models/cms/draftStatus";
import {connectToDatabase} from "../../db";



export const  cmsReady = async (req: Request, res: Response) => {

    try {

        const drafts = await Draft.find({ status: DraftStatus.Ready });
    
        res.send(drafts)
    } catch (error) {
        console.log(error)
    }
};

