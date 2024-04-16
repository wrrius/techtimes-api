import express, {Request, Response} from "express";
import {Draft} from "../../models/cms/draft";
import {requireAuth} from "@sitechtimes/shared";
import {connectToDatabase} from "../../db";



export const  cmsNew = async (req: Request, res: Response) => {

    try {
        await connectToDatabase();

        const draft = Draft.build({
           title: 'Untitled',
           content: 'This is where you should write the content of your article ...',
           userId: req.currentUser!.id
        });
    
       await draft.save()
    
       res.status(201).send(draft);
    } catch (error) {
        console.log(error)
    }
};

