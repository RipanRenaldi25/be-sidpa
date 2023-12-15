import PasswordHashAbstract from "../../Applications/Security/PasswordHashAbstract";
import AuthorizationError from "../../Commons/Exceptions/AuthorizationError";

class PasswordHashConcrete extends PasswordHashAbstract {
    bcrypt: any;
    constructor({bcrypt}: {bcrypt: any}) {
        super();
        this.bcrypt = bcrypt;
    };

    async hash(password: string): Promise<string> {
        return await this.bcrypt.hash(password, 10);
    }
    async comparePassword(password: string, passwordHashed: string): Promise<void> {
        const isMatch = await this.bcrypt.compare(password, passwordHashed);
        if(!isMatch){
            throw new AuthorizationError('Username or password is not match');
        }
    }
}

export default PasswordHashConcrete