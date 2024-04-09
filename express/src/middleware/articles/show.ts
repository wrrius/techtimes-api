import express, { Request, Response } from 'express';
import { Article } from "../../models/articles/article"
import {connectToDatabase} from "../../db";
import {NotFoundError} from "@sitechtimes/shared";


export const articlesShow = async (req: Request, res: Response) => {

    try {
        await connectToDatabase();

        const { slug } = req.params;
    
        const article = await Article.findOne({ slug });
    
        if (!article){
            throw new NotFoundError();
        }
    
        res.status(200).send(article);
    } catch (error) {
        console.log(error)
    }
    
};

