import { PrismaClient } from "@prisma/client";
import RequestRepositoryAbstract from "../../Domains/Repositories/RequestRepositoryAbstract";
import { v4 } from 'uuid'
import Request from "../../Domains/Entities/Request/Request";

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
}

export default RequestRepositoryConcrete;