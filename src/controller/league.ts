import "reflect-metadata";

import { Context } from "koa";
import * as pino from "pino";
import { Service } from "typedi";
import { LeagueService } from "../service/league";
import { League } from "../entity/league";

const logger = pino();

@Service()
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  async getAllLeagues(ctx: Context, next: () => void) {
    let leagues: League[] = await this.leagueService.getAllLeagues(
      ctx.request.query
    );
    ctx.state.data = leagues;
    await next();
  }

  async getLeagueById(ctx: Context, next: () => void) {
    let league: League = await this.leagueService.getLeagueById(
      ctx.params.league_id
    );
    ctx.state.data = league;
    await next();
  }
}
