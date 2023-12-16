/**istanbul ignore files */

abstract class AuthRepositoryAbstract {
    async insertRefreshToken(refreshToken: string, nik: string): Promise<void> {
        throw new Error('AUTH_REPOSITORY.INSERT_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    async deleteRefreshToken(refreshToken: string): Promise<void> {
        throw new Error('AUTH_REPOSITORY.DELETE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    async deleteRefreshTokenByUsername(username: string): Promise<void> {
        throw new Error('AUTH_REPOSITORY.DELETE_REFRESH_TOKEN_BY_USERNAME_METHOD_NOT_IMPLEMENTED');
    }
    async checkValidRefreshToken(refreshToken: string): Promise<{name: string, nik: string, roleId: string}> {
        throw new Error('AUTH_REPOSITORY.CHECK_VALID_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    async deleteRefreshTokenIfExists(username: string) {
        throw new Error('AUTH_REPOSITORY.DELETE_REFRESH_TOKEN_IF_EXISTS_METHOD_NOT_IMPLEMENTED');
        
    }
};

export default AuthRepositoryAbstract;