/**istanbul ignore files */

import UserRepositoryAbstract from "../../Domains/Repositories/UserRepositoryAbstract";
import PasswordHashAbstract from "../Security/PasswordHashAbstract";
import IUser from "../../Domains/Entities/User/IUser";
import UserBuilder from "../../Domains/Entities/User/User";

type userToRegisterType = Pick<IUser, "nik" | "name" | "username" | "password" | "roleId">

class RegisterUsecase {
    userRepository: UserRepositoryAbstract
    passwordHash: PasswordHashAbstract

    constructor({ userRepository, passwordHash }: { userRepository: UserRepositoryAbstract, passwordHash: PasswordHashAbstract }) {
        this.userRepository = userRepository;
        this.passwordHash = passwordHash
    }
    async execute(payload: userToRegisterType) {
        const userToRegister = new UserBuilder(payload.nik)
            .setName(payload.name)
            .setUsername(payload.username)
            .setPassword(payload.password)
            .setRoleId(payload.roleId)
            .build();
        await this.userRepository.verifyAvailableUsername(userToRegister.username);
        await this.userRepository.verifyAvailableNik(payload.nik);
        userToRegister.password = await this.passwordHash.hash(userToRegister.password);
        const registeredUser: userToRegisterType = await this.userRepository.register({
            name: userToRegister.name,
            nik: userToRegister.nik,
            username: userToRegister.username,
            password: userToRegister.password,
            roleId: userToRegister.roleId
        });

        return registeredUser;
    }
}

export default RegisterUsecase;