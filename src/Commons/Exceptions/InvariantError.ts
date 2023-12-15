
import ClientError from "./ClientError";

class InvariantError extends ClientError {
    constructor(message: string){
        super(message);
        this.statusCode = 400;
    }
};

export default InvariantError