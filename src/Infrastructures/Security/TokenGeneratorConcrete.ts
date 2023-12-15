import TokenGeneratorAbstract from "../../Applications/Security/TokenGeneratorAbstract";

class TokenGeneratorConcrete extends TokenGeneratorAbstract {
    jwt: any;
    constructor({jwt}: {jwt: any}) {
        super();
        this.jwt = jwt
    }
    generateToken(payload: { roleId: string; name: string; nik: string; }, secretToken: string, options: { expiresIn: number; }): string {
        const jwt = this.jwt.sign(payload, secretToken, {expiresIn: 3600 * 8});
        return jwt;
    }
    verifyToken(token: string, secretToken: string): { roleId: string; name: string; nik: string; } {
        const payload = this.jwt.verify(token, secretToken);
        return payload;
    }
}

export default TokenGeneratorConcrete;