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

    async getUsers() {
        return await this.prisma.users.findMany({include: {contacts: true}, where: {
            roleId: {
                not: '2'
            }
        }});
    }

    async searchUserByNik(nik: string ){
        const users = await this.prisma.users.findMany({
            where: {
                nik: {
                    contains: nik
                }
            },
            include: {
                contacts: true
            }
        });
        return users;
    } 

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

    async _checkPhoneNumberOnDatabase(phoneNumber: string) {
        const contacts = await this.prisma.contacts.findUnique({
            where: {
                phoneNumber
            }
        });
        if(!!contacts) {
            throw new InvariantError('Phone number already used');
        }
    }
    async register({ nik, username, password, name, roleId, phoneNumber }: { nik: string; name: string; username: string; password: string; roleId: string; phoneNumber: string }): Promise<any> {
        await this._checkPhoneNumberOnDatabase(phoneNumber);
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
                            role: roleId === '1' ? 'USER' : 'ADMIN'
                        },
                        where: {
                            id: roleId
                        }
                    }
                },
                contacts: {
                    create: {
                        phoneNumber
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
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
        if(!user) {
            throw new NotFoundError('User not found');
        };
        return user
    }
    
    async seed({ nik, username, password, name, roleId, phoneNumber }: { username: string; password: string; nik: string; name: string; roleId: string; } & { phoneNumber: string; }): Promise<any> {
        const isExists = !!await this.prisma.users.findUnique({
            where: {nik}
        })
        if(isExists){
            return ;
        }
        await this._checkPhoneNumberOnDatabase(phoneNumber);
        const hashedPassword = await this.passwordHash.hash(password);
        const admin = await this.prisma.users.create({
            data: {
                nik,
                name,
                username,
                password: hashedPassword,
                roleId
            }
        });
        if(!admin) {
            throw new InvariantError('Cannot initiate seed');
        }
    };
}

export default UserRepositoryConcrete;