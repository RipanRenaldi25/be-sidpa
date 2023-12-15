import joi from 'joi';
import InvariantError from '../../Commons/Exceptions/InvariantError';

type loginPayloadType = {
    username: string,
    password: string
}

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

const validateLoginPayload = (payload: loginPayloadType) => {
    try{
        loginSchema.validate(payload);
    }catch(err: any) {
        throw new InvariantError(`Payload tidak sesuai: ${err.message}`);
    }
};

export default validateLoginPayload;