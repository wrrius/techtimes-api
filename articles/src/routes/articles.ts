import express, { Request, Response } from 'express';
import {validateRequest, BadRequestError} from "@sitechtimes/shared";
import queryscript from 'queryscript';
import { app } from '../app';
import { check } from 'express-validator';

import { Article } from "../models/article-temp";

const router = express.Router();
//app.use(queryscript);


router.get('/api/articles', async (req: Request, res: Response) => {
    let topic = "";
    let limit = 20;
    let query = "";
    let page = 0;

    //let Result = await User.find({ role: /writer/ }, null, { skip: 0 }).exec();
    if(req.query.topic !== undefined) { topic = String(req.query.topic); }
    if(req.query.query !== undefined) { query = String(req.query.query); }

    if (req.query.q === undefined) { limit = 20;} 
    else if(Number(req.query.q) > 0) {  limit = Number(req.query.q);}
    else{ throw new BadRequestError('This is not a valid limit');}

    if (req.query.page === undefined) { page = 0} 
    else if(Number(req.query.page) > -1) {  page = Number(req.query.page);}
    else{ throw new BadRequestError('This is not a valid page');}

    let qe = new RegExp(`\\b${query}\\b`, 'gi');
    let top = new RegExp(`\\b${topic}\\b`, 'gi');

    let Articles = await Article.find({ content: qe , topic: top }, null, { skip: page*10}).limit(limit).exec();
    res.status(200).send([[topic, limit, query, page], Articles]);
});


export { router as sampleArticleRouter }
