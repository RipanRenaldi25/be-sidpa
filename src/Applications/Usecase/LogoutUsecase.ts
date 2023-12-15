import AuthRepositoryAbstract from "../../Domains/Repositories/AuthRepositoryAbstract";

class LogoutUsecase {
    authRepository: AuthRepositoryAbstract
    constructor({authRepository}: {authRepository: AuthRepositoryAbstract}) {
        this.authRepository = authRepository;
    };
    
    async execute(payload: string) {
        await this.authRepository.deleteRefreshToken(payload);
    }

};

export default LogoutUsecase;