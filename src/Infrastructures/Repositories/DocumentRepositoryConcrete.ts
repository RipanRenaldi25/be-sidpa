import { PrismaClient } from "@prisma/client";
import DocumentRepositoryAbstract from "../../Domains/Repositories/DocumentRepositoryAbstract";

class DocumentRepositoryConcrete extends DocumentRepositoryAbstract {
    prisma: PrismaClient; 
    constructor({prisma}: { prisma: PrismaClient }) {
        super();
        this.prisma = prisma;
    }

    async getUserRequestDocuments(nik: string): Promise<any> {
        const requests = await this.prisma.users.findUnique({
            where: {
                nik
            },
            include: {
                requests: {
                    include: {
                        documents: true
                    }
                }
            }
        });
        return requests;
    }
};

export default DocumentRepositoryConcrete;