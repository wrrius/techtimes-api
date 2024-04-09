import express, { Request, Response } from "express";

export const authSignOut = async (req: Request, res: Response) => {

    try {
        req.session = null;
        res.status(204).send({});
    } catch (error) {
        console.log(error)
    }
    
};
