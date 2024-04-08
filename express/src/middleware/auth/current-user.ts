import express, { Request, Response } from "express";
import {currentUser} from "@sitechtimes/shared";


export const authCurrentUser = async (req: Request, res: Response) => {

    try {
        res.send({...req.currentUser || null })
    } catch (error) {
        console.log(error)
    }
    
});

