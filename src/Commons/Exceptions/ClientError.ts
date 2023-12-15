/**istanbul ignore file */

class ClientError extends Error {
    constructor(message: string, public statusCode: number = 400) {
        super(message);
        this.name = 'CLIENT ERROR';
        this.statusCode = statusCode;
    }
}

export default ClientError;