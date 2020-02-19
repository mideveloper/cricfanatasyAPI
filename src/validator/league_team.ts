import * as Joi from '@hapi/joi';

export const CreateLeagueTeamSchema = Joi.object({
  id: Joi.number(),
  userId: Joi.number().required(),
  name: Joi.string()
    .max(200)
    .required(),
  leagueId: Joi.number().required(),
  formationId: Joi.number().required(),
  players: Joi.array()
    .length(11)
    .items(Joi.number())
    .required(),
});
