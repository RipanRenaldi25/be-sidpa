/*istanbul ignore file */

import IUser from "../Entities/User/IUser";

type User = Pick<IUser, "nik" | "name" | "username" | "password" | "roleId">;

abstract class UserRepositoryAbstract {
    async verifyAvailableUsername(username: string): Promise<void> {
        throw new Error('USER_REPOSITORY.VERIFY_AVAILABLE_USERNAME_METHOD_NOT_IMPLEMENTED');
    }
    async verifyAvailableNik(nik: string): Promise<void> {
        throw new Error('USER_REPOSITORY.VERIFY_AVAILABLE_NIK_METHOD_NOT_IMPLEMENTED');
    }
    async register({ nik, username, password, name, roleId }: User): Promise<any> {
        throw new Error('USER_REPOSITORY.REGISTER_METHOD_NOT_IMPLEMENTED');
    }
    async login ({ username, password }: Pick<IUser, "username" | "password">): Promise<any> {
        throw new Error('USER_REPOSITORY.LOGIN_METHOD_NOT_IMPLEMENTED');
    }
    async checkUserOnDatabase(username: string): Promise<void> {
        throw new Error('USER_REPOSITORY.CHECK_USER_ON_DATABASE_METHOD_NOT_IMPLEMENTED');
    }
    async getUserByUsername(username: string ): Promise<User> {
        throw new Error('USER_REPOSITORY.GET_USERNAME_BY_USERNAME_METHOD_NOT_IMPLEMENTED');
    }
    async getUserByNik(nik: string): Promise<Pick<User, "nik" | "name" | "username" | "roleId">> {
        throw new Error('USER_REPOSITORY.GET_USERNAME_BY_NIK_METHOD_NOT_IMPLEMENTED');
    }
}

export default UserRepositoryAbstract;