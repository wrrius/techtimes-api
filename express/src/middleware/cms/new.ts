import express, {Request, Response} from "express";
import {Draft} from "../../models/cms/draft";
import {requireAuth} from "@sitechtimes/shared";



export const  cmsNew = async (req: Request, res: Response) => {

    try {

        const draft = await Draft.create({
           title: 'Untitled',
           content: 'This is where you should write the content of your article ...',
           userId: req.currentUser!.id
        });    
       res.status(201).send(draft);
    } catch (error) {
        console.log(error)
    }
};

