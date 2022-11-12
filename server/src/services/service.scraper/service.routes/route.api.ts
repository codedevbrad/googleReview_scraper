import { Router , Application , Request , Response , NextFunction } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';

import scrapeGoogle from './functions/scraper';


// / service / scraper / 

const feature_api = Router();

feature_api.get( '/' , asyncHandler ( async ( req: Request , res: Response  ) => {
    res.status(201).send('/ service / scraper / ');
}));

feature_api.get( '/reviews' , asyncHandler ( async ( req: Request , res: Response ) => {
    const data = await scrapeGoogle({
       url : "https://www.google.com/search?authuser=3&sxsrf=ALiCzsZU-v8k1AsgbzkHUFPT634TZNQmig%3A1667666384799&q=UPVC%20Window%20and%20Door%20Repairs&stick=H4sIAAAAAAAAAONgU1I1qDAxMTA0Mkm1SEsxsjQxSLS0MqhIM0lNMUtJMTVLsjRLM0gzX8QqExoQ5qwQnpmXkl-ukJiXouCSn1-kEJRakJhZVAwAsWaQAkgAAAA&mat=CR5vQE98A5AJ&ved=2ahUKEwif2OCzvZf7AhWCSkEAHQiVDUoQrMcEegQIERAG"
    });
    res.status(201).send(data);
}));


export default feature_api;