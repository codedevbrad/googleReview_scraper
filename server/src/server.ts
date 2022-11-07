/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import express , { Application , Request , Response , NextFunction } from 'express';  
// import 'express-async-errors';
import { errorHandler } from './utils/errorHandler';
import { asyncHandler } from './utils/asyncHandler';

import feature_api from './services/service.scraper/service.routes/route.api';

const app = express();
const port = process.env._PORT || 5000 ;
const server = require('http').createServer( app );

app.use( express.urlencoded({ extended: true }));
app.use( express.json());


const getUserFromDb2 = async () => {
    console.log('called getuser2');
    return new Promise((_, reject) => {
        reject('This is an error from fetching data from a model');
    });
};

app.get( '/' , asyncHandler ( async ( req: Request , res: Response , next: NextFunction ) => {
    const data = await getUserFromDb2();
    res.status(201).json({ user: data });
}));


app.use('/service/scraper' , feature_api );



errorHandler( app );


server.listen( port, ( ) => {
    console.log(`service running on ${ port }`);
});