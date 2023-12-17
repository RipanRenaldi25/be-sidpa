import UserBuilder from "../User/User";

/**
 * test case scenario
 * Should have correct props when instantiate an object
 * Should change props when setter method is called
 */

describe('User Entities', () => {
    const user = new UserBuilder('123')
        .setUsername('ripan')
        .setPassword('asd')
        .setRoleId('1')
        .setName('ripan')
        .setNik('123')
        .build();
    it('Should have correct props when instantiate an object', () => {
            expect(user.name).toBe('ripan');
            expect(user.nik).toBe('123');
            expect(user.password).toBe('asd');
            expect(user.username).toBe('ripan');
            expect(user.roleId).toBe('1');
    });

    it('Should change props when setter method is called', () => {
        user.name = 'ubah';
        user.username = 'username';
        user.roleId = '2';
        user.password = 'rahasia';
        user.nik='321'

        expect(user.name).toBe('ubah');
        expect(user.nik).toBe('321');
        expect(user.password).toBe('rahasia');
        expect(user.username).toBe('username');
        expect(user.roleId).toBe('2');
    })
})