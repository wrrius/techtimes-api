import express, { Request, Response } from 'express';
import { Article } from "../../models/articles/article";
import {connectToDatabase} from "../../db";


export const articlesIndex = async (req: Request, res: Response) => {

    try {
        await connectToDatabase();

        let query: any = {};
        let limit = 20;
        let sortBy = { updatedAt: 1 };
    
        if(req.query.category) {
            query.category = req.query.category.toString();
        }
    
        if (req.query.q) {
            limit = Number(req.query.q);
        }
    
        if(req.query.sort === "dateDes") {
            sortBy = { updatedAt: -1 };
        }
    
        const articles = await Article.find(query).sort(sortBy).limit(limit);
    
        res.status(200).send(articles);
    } catch (error) {
        console.log(error)
    }
    
};

