import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
    errorFormat: 'pretty',
    log: ['query', 'error']
});

export default prismaClient;