/*istanbul ignore file*/

abstract class PasswordHashAbstract {
    async hash(password: string): Promise<string> {
        throw new Error('PASSWORD_HASH_ABSTRACT.HASH_METHOD_NOT_IMPLEMENTED');
    }
    async comparePassword(password: string, passwordHashed: string): Promise<void> {
        throw new Error('PASSWORD_HASH_ABSTRACT.COMPARE_PASSWORD_METHOD_NOT_IMPLEMENTED');
    }
};

export default PasswordHashAbstract;