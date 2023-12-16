import { PrismaClient } from "@prisma/client";
import RequestRepositoryAbstract from "../../Domains/Repositories/RequestRepositoryAbstract";
import { v4 } from 'uuid'
import Request from "../../Domains/Entities/Request/Request";
import NotFoundError from "../../Commons/Exceptions/NotFoundError";

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
                requests: true
            }
        });
        return requestUserDocument;
    }

    async getRequests(): Promise<any> {
        const requests = await this.prisma.requests.findMany({
            include: {
                documents: true
            }
        });
        return requests;
    }
}

export default RequestRepositoryConcrete;