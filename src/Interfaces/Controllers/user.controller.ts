import express from 'express';
import prismaClient from '../../Infrastructures/prisma/prismaClient';
import bcrypt from 'bcrypt';

// EXCEPTIONS
import ClientError from '../../Commons/Exceptions/ClientError';

// Security
import PasswordHashConcrete from '../../Infrastructures/Security/PasswordHashConcrete';

// Repository
import UserRepositoryConcrete from '../../Infrastructures/Repositories/UserRepositoryConcrete';
import DocumentRepositoryConcrete from '../../Infrastructures/Repositories/DocumentRepositoryConcrete';
import InvariantError from '../../Commons/Exceptions/InvariantError';

const passwordHash = new PasswordHashConcrete({bcrypt: bcrypt});
const userRepository = new UserRepositoryConcrete({
    prisma: prismaClient,
    passwordHash
})
const documentRepository = new DocumentRepositoryConcrete({
    prisma: prismaClient
});

class UserController {

    static async getUserByNik(req: express.Request, res: express.Response) {
        try{
            const { nik } = req.params;
            const user = await userRepository.getUserByNik(nik);
            res.status(200).json({
                status: 'Success',
                message: 'User found',
                data: user
            });
        }catch(err: any) {
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: err.message
                })
            }
        }
    }

    static async getUsers(req: express.Request, res: express.Response) {
        try{
            const users = await userRepository.getUsers();
            res.status(200).json({
                status: 'Success',
                message: 'User found',
                data: users
            });
        }catch(err: any) {
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: err.message
                })
            }
        }
    }

    static async getUserDocument(req: express.Request, res: express.Response) {
        try{
            const { nik } = req.user;
            const userRequestDocument = await documentRepository.getUserRequestDocuments(nik);
            res.status(200).json({
                status: 'Success',
                message: 'User found',
                data: userRequestDocument
            });
        }catch(err: any) {
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: err.message
                })
            }
        }
    }

    static async searchUserByNik(req: express.Request, res: express.Response) {
        try{
            const nik: string = req.query.nik as string;
            if(!nik) {
                throw new InvariantError('Nik is required');
            }
            const userRequestDocument = await userRepository.searchUserByNik(nik);
            res.status(200).json({
                status: 'Success',
                message: 'User found',
                data: userRequestDocument
            });
        }catch(err: any) {
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: err.message
                })
            }
        }
    }
}

export default UserController;