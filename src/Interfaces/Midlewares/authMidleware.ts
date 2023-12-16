import express from 'express';
import AuthorizationError from '../../Commons/Exceptions/AuthorizationError';
import TokenGeneratorConcrete from '../../Infrastructures/Security/TokenGeneratorConcrete';
import ClientError from '../../Commons/Exceptions/ClientError';
import jwt from 'jsonwebtoken';
import ForbiddenrError from '../../Commons/Exceptions/ForbiddenError';

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}
const user: {[key: string]: string} = {
    "1": "User",
    "2": "Admin"
}

const tokenGenerator = new TokenGeneratorConcrete({jwt});

export const authMidleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const bearerToken: string = req.headers.authorization!;
        if(!bearerToken){
            throw new AuthorizationError('Un authorize user');
        }
        const [, token] = bearerToken.split(' ');
        const payload = tokenGenerator.verifyToken(token, process.env.SECRET_ACCESS_TOKEN!);
        req.user = payload;
        next()
    }catch(err: any){
        if(err instanceof ClientError){
            res.status(err.statusCode).json({
                status: 'fail',
                message: err.message
            })
        }else {
            res.status(500).json({
                status: 'fail',
                message: `error ${err.message}`
            })
        }
    }
}

export const authorizationMidleware = (permissions: string[]) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { roleId } = req.user;
        if(!permissions.includes(user[roleId])) {
            throw new ForbiddenrError('User cannot access this resource');
        }
        next();
    }catch(err: any){
        if(err instanceof ClientError){
            res.status(err.statusCode).json({
                status: 'fail',
                message: err.message
            })
        }else {
            res.status(500).json({
                status: 'fail',
                message: `error ${err.message}`
            })
        }
    }
}