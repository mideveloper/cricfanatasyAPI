/* tslint:disable:semicolon */

import * as pino from 'pino';
import { Service } from 'typedi';
import { LeagueTeamRepository } from '../repository/league_team';
import { CreateLeagueTeamSchema } from '../validator/league_team';

const logger = pino();

@Service()
export class LeagueTeamService {

    constructor(private repo: LeagueTeamRepository) { }

    async create(user: any, data: any): Promise<any> {
        const payload = await this.verifyCreatePayloadPayload(data);
        return await null;
    }

    private async verifyCreatePayloadPayload(payload: any) {
        await CreateLeagueTeamSchema.validateAsync(payload);
        return payload;
    }
}
