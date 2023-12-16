import { PrismaClient } from "@prisma/client";
import UserRepositoryAbstract from "../../Domains/Repositories/UserRepositoryAbstract";
import PasswordHashAbstract from "../../Applications/Security/PasswordHashAbstract";
import NotFoundError from "../../Commons/Exceptions/NotFoundError";
import InvariantError from "../../Commons/Exceptions/InvariantError";

class UserRepositoryConcrete extends UserRepositoryAbstract {
    prisma: PrismaClient;
    passwordHash: PasswordHashAbstract;
    constructor({prisma, passwordHash}: {prisma: PrismaClient, passwordHash: PasswordHashAbstract}) {
        super();
        this.prisma = prisma;
        this.passwordHash = passwordHash;
    };

    async checkUserOnDatabase(username: string): Promise<void> {
        const user = await this.getUserByUsername(username);
        if(!user){
            throw new NotFoundError('User doesn`t exists on database');
        }
    }
    async getUserByUsername(username: string): Promise<{ username: string; password: string; nik: string; name: string; roleId: string; }> {
        const user = await this.prisma.users.findUnique({
            where: {
                username
            }
        });
        return user!;
    }
    async register({ nik, username, password, name, roleId }: { nik: string; name: string; username: string; password: string; roleId: string; }): Promise<any> {
        const newUser = await this.prisma.users.create({
            data: {
                nik,
                username,
                password,
                name,
                roles: {
                    connectOrCreate: {
                        create: {
                            id: roleId,
                            role: 'USER'
                        },
                        where: {
                            id: roleId
                        }
                    }
                }
            },
            include: {
                roles: {
                    select: {
                        role: true
                    }
                }
            }
        });
        return newUser;
    }
    
    async verifyAvailableUsername(username: string): Promise<void> {
        const user = await this.prisma.users.findUnique({
            where: {
                username
            }
        });

        if(user) {
            throw new InvariantError('Username already exists on database');
        }
    }
    
    async verifyAvailableNik(nik: string): Promise<void> {
        const isExists = await this.prisma.users.findUnique({
            where: {
                nik
            }
        });
        if(isExists) {
            throw new InvariantError('NIK already exists on database');
        }
    }

    async getUserByNik(nik: string): Promise<Pick<{ nik: string; username: string; password: string; roleId: string; name: string; }, "nik" | "username" | "roleId" | "name">> {
        const user = await this.prisma.users.findUnique({
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
        if(!user) {
            throw new NotFoundError('User not found');
        };
        return user
    }
}

export default UserRepositoryConcrete;