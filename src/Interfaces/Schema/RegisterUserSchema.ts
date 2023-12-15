import joi from 'joi';
import InvariantError from '../../Commons/Exceptions/InvariantError';

type registerUserType = {
    nik: string,
    name: string,
    username: string,
    password: string
}

const registerSchema = joi.object({
    nik: joi.string().required(),
    name: joi.string().required(),
    username: joi.string().required().min(6),
    password: joi.string().required().min(6),
    roleId: joi.string().required()
});

const validateRegisterPayload = (payload: registerUserType) => {
    const result = registerSchema.validate(payload)
    if(result.error){
        throw new InvariantError(`Payload tidak sesuai: ${result.error.message}`);
    }
}

export default validateRegisterPayload;