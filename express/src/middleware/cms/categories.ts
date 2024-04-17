import express, {Request, Response} from "express";
import {Category} from "../../models/cms/category";



export const  cmsCategories = async (req: Request, res: Response) => {

    try {
        const categories = Object.values(Category);

        res.status(200).send(categories);
    } catch (error) {
        console.log(error)
    }
};

