import * as Joi from '@hapi/joi/lib';

export const CreateLeagueTeamSchema = Joi.object({
    name: Joi
        .string()
        .max(200)
        .required(),
    league_id: Joi
        .number()
        .required(),
    remaining_budget: Joi
        .number()
        .required(),
    formation_id: Joi
        .number()
        .required(),
});
