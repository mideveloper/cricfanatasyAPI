import * as Joi from '@hapi/joi/lib';

export const ExampleCreateSchema = Joi.object({
    name: Joi
        .string()
        .required(),
});
