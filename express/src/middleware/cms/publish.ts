import express, {Request, Response} from 'express';
import {NotFoundError, requireAuth, roles} from "@sitechtimes/shared";
import mongoose from "mongoose";
import {connectToDatabase} from "../../db";

import {Homepage} from "../../models/cms/homepage";
import {Article} from "../../models/cms/article";
import {Position} from "../../models/cms/position";
import {Draft} from "../../models/cms/draft";


export const  cmsPublish = async (req: Request, res: Response) => {

    try {
        await connectToDatabase();

        const draft = await Draft.findById(req.params.id);
    
        if (!draft){
           throw new NotFoundError();
        }
    
        const db = mongoose.connection.db.collection('users');
    
        const users = await db.find({_id: mongoose.Types.ObjectId(draft.userId)}).toArray();
    
        if (!users[0]){
            throw new NotFoundError();
        }
    
        const attrs = {
            title: draft.title,
            content: draft.content,
            imageUrl: draft.imageUrl,
            imageAlt: draft.imageAlt,
            category: draft.category,
            user: {
                id: draft.userId,
                name: users[0].name,
                imageUrl: users[0].imageUrl
            }
        }
    
        const article = Article.build({ ...attrs });
    
        await article.save();
        await Draft.findByIdAndDelete(req.params.id);
    
    
        // create homepage article
        const isValidPosition = Object.values(Position).includes(req.body.position);
    
        if (isValidPosition) {
            await Homepage.findOneAndRemove({ position: req.body.position, category: draft.category});
    
            const homepage = Homepage.build({
                ...attrs,
                position: req.body.position,
                slug: article.slug
            });
    
            await homepage.save();
        }
    
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
};

