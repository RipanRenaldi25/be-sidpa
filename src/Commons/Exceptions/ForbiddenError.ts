import ClientError from "./ClientError";

class ForbiddenrError extends ClientError {
    constructor(message: string) {
        super(message);
        this.statusCode = 403;
    };
}

export default ForbiddenrError;