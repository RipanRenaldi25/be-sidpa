import express from 'express';
import prismaClient from '../../Infrastructures/prisma/prismaClient';
import bcrypt from 'bcrypt';


// Security
import PasswordHashConcrete from '../../Infrastructures/Security/PasswordHashConcrete';

// Repository
import UserRepositoryConcrete from '../../Infrastructures/Repositories/UserRepositoryConcrete';
import ClientError from '../../Commons/Exceptions/ClientError';


const passwordHash = new PasswordHashConcrete({bcrypt: bcrypt});
const userRepository = new UserRepositoryConcrete({
    prisma: prismaClient,
    passwordHash
})
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
}

export default UserController;