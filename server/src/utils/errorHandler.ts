/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { Application , Request , Response , NextFunction } from 'express'; 

const ErrorMessageTemplate = ( msg : string ) => {
    return {
        "msg": msg ,
        "portMsg": "the app doesnt seem to be working as intended. please refresh your browser."
    }
}


export function errorHandler ( app : Application ) {

    app.use( ( req : Request , res : Response ) => {
        res.status( 404 ).send( 'error 404');
    });
  
    // error handler
    // error handler
    app.use( ( err: { message: any; status: any }  , req: Request , res : Response , next : NextFunction ) => {
        const errorMessage = ErrorMessageTemplate( err.message || err );
        console.error( 'err || err.message' );
        
        res.status( err.status || 500 );
        res.send( errorMessage );
    });
}