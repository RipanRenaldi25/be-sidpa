import UserRepositoryAbstract from "../../Domains/Repositories/UserRepositoryAbstract";
import PasswordHashAbstract from "../Security/PasswordHashAbstract";
import AuthRepositoryAbstract from "../../Domains/Repositories/AuthRepositoryAbstract";
import TokenGeneratorAbstract from "../Security/TokenGeneratorAbstract";

type loginPayload = {
    username: string,
    password: string
};


class LoginUsecase {
    userRepository: UserRepositoryAbstract
    passwordHash: PasswordHashAbstract
    authRepository: AuthRepositoryAbstract
    tokenGenerator: TokenGeneratorAbstract

    constructor({userRepository, passwordHash, authRepository, tokenGenerator}: {userRepository: UserRepositoryAbstract, passwordHash: PasswordHashAbstract, authRepository: AuthRepositoryAbstract, tokenGenerator: TokenGeneratorAbstract}) {
        this.userRepository = userRepository;
        this.passwordHash = passwordHash;
        this.authRepository = authRepository;
        this.tokenGenerator = tokenGenerator;
    };

    async execute(payload: loginPayload) {
        await this.userRepository.checkUserOnDatabase(payload.username);
        await this.authRepository.deleteRefreshTokenIfExists(payload.username);
        const userOnDatabase = await this.userRepository.getUserByUsername(payload.username);
        await this.passwordHash.comparePassword(payload.password, userOnDatabase.password);
        const refreshToken = await this.tokenGenerator.generateToken({
            roleId: userOnDatabase.roleId,
            name: userOnDatabase.name,
            nik: userOnDatabase.nik
        }, process.env.SECRET_REFRESH_TOKEN!, {
            expiresIn: 24 * 3600
        });
        await this.authRepository.insertRefreshToken(refreshToken, userOnDatabase.nik);
        const accessToken = await this.tokenGenerator.generateToken({
            roleId: userOnDatabase.roleId,
            name: userOnDatabase.name,
            nik: userOnDatabase.nik
        }, process.env.SECRET_ACCESS_TOKEN!, {
            expiresIn: 3600 * 8
        });
        return {
            ...userOnDatabase,
            refreshToken,
            accessToken
        }
    };
};

export default LoginUsecase