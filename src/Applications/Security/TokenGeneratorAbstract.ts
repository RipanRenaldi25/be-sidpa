import jsonwebtoken from 'jsonwebtoken';


type Payload = {
    roleId: string,
    name: string
    nik: string
}
class TokenGeneratorAbstract {
    generateToken(payload: Payload, secretToken: string, options: {expiresIn: number}): string {
        throw new Error('TOKEN_GENERATOR.GENERATE_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    verifyToken(token: string, secretToken: string): Payload {
        throw new Error('TOKEN_GENERATOR.VERIFY_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
};

export default TokenGeneratorAbstract;