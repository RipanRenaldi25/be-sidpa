import app from "../app";
import authRouter from "../Routes/auth.route";
import supertest from 'supertest';

/**
 * test case scenario
 * should return 400 error when username is less than 6 characted
* should return 400 error when password is less than 6 character
 */

describe('Authentication Routes', () => {
    app.use('/auth', authRouter);
    describe('/register', () => {
        it('should return InvariantError when username is less than 6 characted', async () => {
            const response = await supertest(app).post('auth/register').send({
                nik: '431238738291',
                name: 'ripan renaldi',
                username: 'asd',
                password:'asd',
                roleId: '1'
            }).set('Accept', 'application/json');
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('message');
        });
        
    })
})