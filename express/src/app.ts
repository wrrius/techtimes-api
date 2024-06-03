import express, { Request, Response } from 'express';
import 'express-async-errors';
import bodyParser, { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from "cookie-session";
import cors from 'cors';
import dotenv from "dotenv"

import {errorHandler, NotFoundError, currentUser} from "@sitechtimes/shared";
import {router} from "./routes";
import { cookie } from 'express-validator';
import { connectToDatabase } from './db';

// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from '../swagger.json'

dotenv.config()
const port = process.env.PORT || 6000

const app = express();
app.set('trust proxy', true);
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
        signed: false, // jwt is already encrypted
        secure: false // TODO: has to be true before prod
    })
)

app.use(cors());

app.use(express.json({ limit: "100mb"}))
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(currentUser);

// app.use('/api/users/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, async () => {
  console.log(`Running on ${port}`)
  await connectToDatabase()
})

app.use( "/", router)



app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});


app.use(errorHandler)
