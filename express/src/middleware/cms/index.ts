import express, { Request, Response } from 'express';
import {requireAuth} from "@sitechtimes/shared";
import {Draft} from "../../models/cms/draft";
import {connectToDatabase} from "../../db";



export const  cmsIndex = async (req: Request, res: Response) => {

    try {

        const drafts = await Draft.find({ userId: "id" });
    
        res.send(drafts);
    } catch (error) {
        console.log(error)
    }
};

