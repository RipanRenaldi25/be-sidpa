import ClientError from "./ClientError";

class AuthorizationError extends ClientError {
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
    };
};


export default AuthorizationError;