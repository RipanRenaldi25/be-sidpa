import UserRepositoryAbstract from "../../Domains/Repositories/UserRepositoryAbstract";
import PasswordHashAbstract from "../Security/PasswordHashAbstract";
import IUser from "../../Domains/Entities/User/IUser";
import RegisterUsecase from "../Usecase/RegisterUsecase";

class UserRepositoryConcrete extends UserRepositoryAbstract {
    async register({ nik, username, password, name, roleId }: { nik: string; name: string; username: string; password: string; roleId: string; }): Promise<{ nik: string; name: string; username: string; password: string; roleId: string; }> {
        throw new Error('asd')
    }
    async verifyAvailableUsername(username: string): Promise<void> {
        throw new Error('asd')        
    }
}

class PasswordHashConcrete extends PasswordHashAbstract {
    async hash(password: string): Promise<string> {
        throw new Error
    }
}

describe('Register Usecase', () => {
    it('Should be able to orchestrate correctly', async () => {
        const userRepositoryConcrete = new UserRepositoryConcrete();
        const passwordHashConcrete = new PasswordHashConcrete();

        const payload = {
            name: 'napir',
            nik: '3213',
            password: 'rahasia',
            roleId: '1',
            username: 'ripan25'
        }

        const mockReturnedUser: Pick<IUser, "name" | "nik" | "username" | "password" | "roleId"> = {
            name: 'napir',
            nik: '3213',
            password: 'encrypted_password',
            roleId: '1',
            username: 'ripan25'
        }

        // mock every function that related
        userRepositoryConcrete.verifyAvailableUsername = jest.fn().mockImplementation(() => Promise.resolve);
        passwordHashConcrete.hash = jest.fn().mockImplementation(() => 'encrypted_password');
        userRepositoryConcrete.register = jest.fn().mockImplementation(() => Promise.resolve(mockReturnedUser));

        //
        const registerUsecase = new RegisterUsecase({userRepository: userRepositoryConcrete, passwordHash: passwordHashConcrete});

        const registeredUser = await registerUsecase.execute(payload);

        expect(userRepositoryConcrete.verifyAvailableUsername).toHaveBeenCalledWith(payload.username);
        expect(passwordHashConcrete.hash).toHaveBeenCalledWith(payload.password);
        expect(userRepositoryConcrete.register).toHaveBeenCalledWith({...payload, password: mockReturnedUser.password});
        expect(registeredUser).toEqual(mockReturnedUser);
    })
})