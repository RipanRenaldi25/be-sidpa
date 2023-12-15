import ClientError from "./ClientError";

class NotFoundError extends ClientError {
    constructor(message: string) {
        super(message);
        this.statusCode = 404
    }
};

export default NotFoundError