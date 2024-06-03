import { Request, Response } from 'express';
import { Article } from "../../models/articles/article";

export const articlesIndex = async (req: Request, res: Response) => {

    try {
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
/*         await Article.create({
            title: 'evil',
            content: 'this one is evil',
            category: 'covid',    
            user: {
                id: 'nice',
                name: 'nicer',
            },
            slug: "evil"
        }) */
        const articles = await Article.find(query).sort(sortBy).limit(limit);
        res.status(200).json(articles);
    } catch (error) {
        console.log(error)
    }
    
};

/* export const articlesIndex = async (req: Request, res: Response) => {
    try {
        // Check the connection status
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database connection is not established');
        }

        // Create a new article
        const ArticleNew = new Article({
            title: "article 1",
            content: "content 1",
            imageUrl: "ImageURL 1",
            category: "covid",
            user: {
                id: "id 1",
                name: "name 1",
                imageUrl: "string 1",
            }
        });

        // Save the new article with detailed error handling
        try {
            await ArticleNew.save();
            console.log('Article saved:', ArticleNew);
        } catch (saveError) {
            console.error('Error saving article:', saveError);
            throw new Error('Failed to save the article');
        }

        // Retrieve all articles
        const articles = await Article.find({});
        console.log('Articles retrieved:', articles.length);

        // Send response with articles
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error:', error);

        // Improved error handling
        res.status(500).json({ message: error.message, error: error.stack });
    }
}; */