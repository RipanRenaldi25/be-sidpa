import express, { request } from 'express';
import ClientError from '../../Commons/Exceptions/ClientError';
import {v4} from 'uuid';
import prismaClient from '../../Infrastructures/prisma/prismaClient';
import Document from '../../Domains/Entities/Document/Document';


// use case
import CreateRequestUsecase from '../../Applications/Usecase/CreateRequestUsecase';

// Repository
import RequestRepositoryConcrete from '../../Infrastructures/Repositories/RequestRepositoryConcrete';
import { RequestBuilder } from '../../Domains/Entities/Request/Request';
import { PROCESS } from '../../Domains/Entities/Request/IRequest';
import InvariantError from '../../Commons/Exceptions/InvariantError';

const requestRepository = new RequestRepositoryConcrete({
    prisma: prismaClient, idGenerator: v4
})
const createRequestUsecase = new CreateRequestUsecase({
    requestRepository
})

class requestsController {
    static async uploadImage (req: express.Request, res: express.Response) {
        try{
            console.log(req.body);
            if(!req.files){
                throw new InvariantError('No files uploaded');
            }
            const documentsToInsert = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => {
                return new Document(file.originalname, req.body.type, `${process.env.BUCKET_BASE_URL}${file.filename}`, req.body.nik)
            });
            console.log({documentsToInsert});
            const newRequest = await createRequestUsecase.execute({nik: req.body.nik, documents: documentsToInsert});
            
            res.status(201).json({
                status: 'success',
                message: 'Request created',
                data: newRequest
            })
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: `Server error : ${err.message}`
                })
            }
        }
    }

    static async getRequestByRequestId(req: express.Request, res: express.Response) {
        try{
            const { request_id } = req.params;
            const request = await requestRepository.getRequestById(request_id);
            res.status(200).json({
                status: 'Success',
                message: 'Request found',
                data: request
            })
        }catch(err: any) {
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: `Server error : ${err.message}`
                })
            }
        }
    }

    static async getRequestByNik(req: express.Request, res: express.Response) {
        try{
            const { nik } = req.params;
            const request = await requestRepository.getRequestByNik(nik);
            res.status(200).json({
                status: 'Success',
                message: 'Request found',
                data: request
            })
        }catch(err: any) {
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: `Server error : ${err.message}`
                })
            }
        }
    }
    static async getRequests(req: express.Request, res: express.Response) {
        try{
            const request = await requestRepository.getRequests();
                res.status(200).json({
                status: 'Success',
                message: 'Request found',
                data: request
            })
        }catch(err: any) {
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'Fail',
                    message: `Server error : ${err.message}`
                })
            }
        }
    }

};

export default requestsController;