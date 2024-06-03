import {Request, Response} from "express";
import { Homepage } from "../../models/articles/homepage";



export const articlesHomepage = async (req: Request, res: Response) => {
    try {
    const query: any = {};

    if(req.query.category){
        query.category = req.query.category.toString();
    }

    if(req.query.position){
        query.position = req.query.position.toString();
    }

    const homepages = await Homepage.find(query);
    res.status(200).json(homepages);
    } catch (error) {
        console.log(error)
    }
};

