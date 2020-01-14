import "reflect-metadata";

import { Context } from "koa";
import * as pino from "pino";
import { Service } from "typedi";
import { LeagueService } from "../service/league";
import { League } from "../entity/league";
import { CURRENT_LEAGUE_ID } from "../util/constants";

const logger = pino();

@Service()
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  async getAllMatchesSchedule(ctx: Context, next: () => void) {
    let league: League = await this.leagueService.getAllLeague(
      ctx.params.league_id || CURRENT_LEAGUE_ID
    );
    ctx.state.data = league;
    await next();
  }
}
