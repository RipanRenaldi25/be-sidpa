import NotFoundError from "../../Commons/Exceptions/NotFoundError";
import AuthRepositoryAbstract from "../../Domains/Repositories/AuthRepositoryAbstract";
import { PrismaClient } from "@prisma/client";

class AuthRepositoryConcrete extends AuthRepositoryAbstract {
    prisma: PrismaClient
    constructor({prisma}: {prisma: PrismaClient}) {
        super();
        this.prisma = prisma;
    }
    async insertRefreshToken(refreshToken: string, nik: string): Promise<void> {
        await this.prisma.authentications.create({
            data: {
                token: refreshToken,
                user: {
                    connect: {
                        nik
                    }
                }
            }
        })
    };

    async deleteRefreshTokenByUsername(username: string): Promise<void> {
        const token = await this._getUserTokenByUsername(username)!;
        await this.deleteRefreshToken(token?.authentications?.token!);
    }
    async _getUserTokenByUsername(username: string){
        return await this.prisma.users.findUnique({
            where: {
                username
            },
            select: {
                authentications: {
                    select: {
                        token: true
                    }
                }
            }
        });
    }
    async deleteRefreshToken(refreshToken: string): Promise<void> {
        await this.prisma.authentications.delete({
            where: {
                token: refreshToken
            }
        })
    }
    async deleteRefreshTokenIfExists(username: string): Promise<void> {
        const token = await this._getUserTokenByUsername(username);
        console.log({token});
        if(!token?.authentications){
            return;
        }
        console.log({test: 'asd'});
        await this.deleteRefreshToken(token.authentications?.token!);
    }
    async checkValidRefreshToken(refreshToken: string): Promise<{name: string, nik: string, roleId: string}> {

        const user = await this.prisma.authentications.findUnique({
            where: {
                token: refreshToken
            },
            include: {
                user: true
            }
        });
        const name = user?.user.name;
        if(!user) {
            throw new NotFoundError(`Refresh token on user ${name} is not exists`);
        };
        return {
            name: user.user.name,
            nik: user.nik,
            roleId: user.user.roleId
        };
    }

}

export default AuthRepositoryConcrete