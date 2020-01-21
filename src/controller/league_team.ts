import "reflect-metadata";

import { Context } from "koa";
import * as pino from "pino";
import { Service } from "typedi";
import { LeagueTeamService } from "../service/league_team";

const logger = pino();

@Service()
export class LaegueTeamController {
    constructor(private leagueTeamService: LeagueTeamService) { }

    async create(ctx: Context, next: () => void) {
        let leagueTeam: any = await this.leagueTeamService.create(ctx.user, ctx.request.body);
        ctx.state.data = leagueTeam;
        await next();
    }
}
