import AuthRepositoryAbstract from "../../Domains/Repositories/AuthRepositoryAbstract";
import TokenGeneratorAbstract from "../Security/TokenGeneratorAbstract";

class UpdateAccessTokenUsecase {
    authRepository: AuthRepositoryAbstract
    tokenGenerator: TokenGeneratorAbstract
    constructor({ authRepository, tokenGenerator }: { authRepository: AuthRepositoryAbstract, tokenGenerator: TokenGeneratorAbstract }) {
        this.authRepository = authRepository;
        this.tokenGenerator = tokenGenerator;
    };

    async execute(refreshToken: string) {
        const user = await this.authRepository.checkValidRefreshToken(refreshToken);
        const newAccessToken = this.tokenGenerator.generateToken(user, process.env.SECRET_ACCESS_TOKEN!, {expiresIn: 3600 * 8})
        return newAccessToken;
    }
};

export default UpdateAccessTokenUsecase;