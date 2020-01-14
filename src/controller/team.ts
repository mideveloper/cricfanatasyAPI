import "reflect-metadata";

import { Context } from "koa";
import * as pino from "pino";
import { Service } from "typedi";
import { TeamService } from "../service/team";
import { Team } from "../entity/team";
import { CURRENT_LEAGUE_ID } from "../util/constants";

const logger = pino();

@Service()
export class TeamController {
  constructor(private teamService: TeamService) {}

  async getAllTeams(ctx: Context, next: () => void) {
    let team: Team[] = await this.teamService.getAllTeams(
      ctx.params.league_id || CURRENT_LEAGUE_ID
    );
    ctx.state.data = team;
    await next();
  }
}
