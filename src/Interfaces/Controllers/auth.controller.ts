import express from 'express';
import RegisterUsecase from '../../Applications/Usecase/RegisterUsecase';
import UserRepositoryConcrete from '../../Infrastructures/Repositories/UserRepositoryConcrete';
import ClientError from '../../Commons/Exceptions/ClientError';
import prismaClient from '../../Infrastructures/prisma/prismaClient';
import PasswordHashConcrete from '../../Infrastructures/Security/PasswordHashConcrete';
import bcrypt from 'bcrypt';
import validateRegisterPayload from '../Schema/RegisterUserSchema';
import LoginUsecase from '../../Applications/Usecase/LoginUsecase';
import jwt from 'jsonwebtoken';
import AuthRepositoryConcrete from '../../Infrastructures/Repositories/AuthRepositoryConcrete';
import TokenGeneratorConcrete from '../../Infrastructures/Security/TokenGeneratorConcrete';
import validateLoginPayload from '../Schema/LoginUserSchema';

// Instantiate Classes
const passwordHashConcrete = new PasswordHashConcrete({bcrypt: bcrypt});
const userRepositoryConcrete = new UserRepositoryConcrete({
    prisma: prismaClient,
    passwordHash: passwordHashConcrete
})
const authRepository = new AuthRepositoryConcrete({
    prisma: prismaClient,
});

// other
const tokenGenerator = new TokenGeneratorConcrete({
    jwt
});


// Usecases
const registerUsecase = new RegisterUsecase({userRepository: userRepositoryConcrete, passwordHash: passwordHashConcrete})
const loginUsecase = new LoginUsecase({userRepository: userRepositoryConcrete,authRepository: authRepository,passwordHash: passwordHashConcrete,tokenGenerator: tokenGenerator})

class UserController {

    static async registerUser(req: express.Request, res: express.Response) {
        try{
            validateRegisterPayload(req.body);
            const {nik, name, username, password, roleId} = req.body;
            console.log(req.body);
            const registeredUser = await registerUsecase.execute({nik, name, username, password, roleId});
            res.status(201).json({
                status: 'Success',
                message: 'User created',
                data: {
                    user: registeredUser
                }
            })
        }catch(err: any){
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'failed',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    server: 'Server error',
                    message: err.message
                })
            }
        }
    }
    static async loginUser(req: express.Request, res: express.Response) {
        try{
            validateLoginPayload(req.body);
            const {username, password} = req.body;
            const userLogedIn = await loginUsecase.execute({username, password});
            res.status(200).json({
                status: 'success',
                message: 'Login success',
                data: userLogedIn
            });
        }catch(err: any) {
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                })
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: `Server Error : ${err.message}`
                })
            }
        }
    }
}

export default UserController;