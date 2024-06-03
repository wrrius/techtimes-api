import express, {Request, Response} from 'express';
import {NotFoundError, requireAuth, roles} from "@sitechtimes/shared";
import mongoose from "mongoose";

import {Homepage} from "../../models/articles/homepage";
import {Article} from "../../models/articles/article";
import {Position} from "../../models/cms/position";
import {Draft} from "../../models/cms/draft";
import { User } from '../../models/auth/user';


export const  cmsPublish = async (req: Request, res: Response) => {

    try {

        const draft = await Draft.findById(req.params.id);
    
        if (!draft){
           throw new NotFoundError();
        }
        
        const users = await User.findById(draft.userId);
    
        const attrs = {
            title: draft.title,
            content: draft.content,
            imageUrl: draft.imageUrl,
            imageAlt: draft.imageAlt,
            category: draft.category,
            user: {
                id: draft.userId,
                name: users.name,
                imageUrl: users.imageUrl
            }
        }
    
        const article = await Article.create({ ...attrs });
    
        await Draft.findByIdAndDelete(req.params.id);
    
    
        // create homepage article
        const isValidPosition = Object.values(Position).includes(req.body.position);
    
        if (isValidPosition) {
            await Homepage.findOneAndDelete({ position: req.body.position, category: draft.category});
    
            await Homepage.create({
                ...attrs,
                position: req.body.position,
                slug: article.slug
            });
    
        }
    
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
};

