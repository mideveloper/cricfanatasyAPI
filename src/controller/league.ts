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

  async getAllMatchesSchedule(ctx: Context, next: () => void) {
    console.log(ctx.request.query);
    let league: League = await this.leagueService.getAllLeague(
      ctx.params.league_id
    );
    ctx.state.data = league;
    await next();
  }
}
