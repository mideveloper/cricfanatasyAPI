import * as Joi from '@hapi/joi/lib';

export const UserLoginSchema = Joi.object({
    username: Joi
        .string()
        .max(50)
        .required(),
    password: Joi
        .string()
        .max(50)
        .required(),
});
