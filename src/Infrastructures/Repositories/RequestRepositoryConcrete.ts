import { PrismaClient } from "@prisma/client";
import RequestRepositoryAbstract from "../../Domains/Repositories/RequestRepositoryAbstract";
import Request from "../../Domains/Entities/Request/Request";
import NotFoundError from "../../Commons/Exceptions/NotFoundError";
import { PROCESS } from "../../Domains/Entities/Request/IRequest";
import { DateTime } from 'luxon';

class RequestRepositoryConcrete extends RequestRepositoryAbstract {
    prisma: PrismaClient;
    idGenerator: any

    constructor({ prisma, idGenerator }: {prisma: PrismaClient, idGenerator: any}) {
        super();
        this.prisma = prisma;
        this.idGenerator = idGenerator;
    }

    async requestDocuments(request: Request, nik: string): Promise<any> {
        const documents = request.documents.map(document => ({
            title: document.title,
            type: document.type,
            url: document.url,
            nik: document.nik
        }));
        const newRequest = await this.prisma.requests.create({
            data: {
                nik,
                documents: {
                    createMany: {
                        data: documents
                    }
                }
            },
            include: {
                documents: true,
                users: true
            }
        });
        return newRequest;
    }
    
    async getRequestById(requestId: string): Promise<any> {
        const request = await this.prisma.requests.findUnique({
            where: {
                id: requestId
            },
            include: {
                users: {
                    select: {
                        name: true,
                        nik: true,
                        contacts: {
                            select: {
                                phoneNumber: true
                            }
                        }
                    }
                },
                documents: true
            }
        });
        if(!request) {
            throw new NotFoundError('Request does`nt exists on database');
        }

        return request;
    }

    async getRequestByNik(nik: string): Promise<any> {
        const requestUserDocument = await this.prisma.users.findUnique({
            where: {
                nik
            },
            include: {
                requests: {
                    select: {
                        id: true,
                        documents: true
                    },
                    include: {
                        documents: true
                    }
                }
            }
        });
        return requestUserDocument;
    }

    async getRequests(): Promise<any> {
        const requests = await this.prisma.requests.findMany({
            include: {
                documents: true,
                users: true
            }
        });
        return requests;
    }

    async updateStatus({ request_id, process }: { request_id: string; process: PROCESS; }): Promise<any> {
        const updatedRequest = await this.prisma.requests.update({
            where: {
                id: request_id
            },
            data: {
                process: PROCESS[process],
                updatedAt: new Date().toISOString()
            }
        });
        return updatedRequest;
    }

    async getRequestDocumentBySearch({keyword, date, status}: {keyword?: string, date?: string, status?: 'UNPROCESS' | 'PROCESS' | 'PROCESSED'}){
        let indonesiaTime;
        if(date){
            indonesiaTime = DateTime.fromFormat(date, 'yyyy-MM-dd', {zone: 'Asia/Jakarta'});
        }
        const gteIso = indonesiaTime ? indonesiaTime.startOf('day').toISO() : undefined
        const letIso = indonesiaTime ? indonesiaTime.endOf('day').toISO() : undefined
        const requests = await this.prisma.requests.findMany({
            where: {
                AND: [
                    {
                        users: {
                            name: {
                                contains: keyword? keyword.toLowerCase() : undefined,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        createdAt: {
                            gte: date? gteIso!: undefined,
                            lte: date? letIso!: undefined
                        }
                    },
                    {
                        process: status ? status : undefined
                    }
                ]
            },
            include: {
                users: true,
                documents: true
            }
        })
        return requests;
    }
}

export default RequestRepositoryConcrete;