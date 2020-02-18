import "reflect-metadata";

import { Context } from "koa";
import * as pino from "pino";
import { Service } from "typedi";
import { TeamService } from "../service/team";
import { Team } from "../entity/team";

const logger = pino();

@Service()
export class TeamController {
  constructor(private teamService: TeamService) {}

  async getTeamsByLeagueId(ctx: Context, next: () => void) {
    let team: Team[] = await this.teamService.getTeamsByLeagueId(
      ctx.params.league_id
    );
    ctx.state.data = team;
    await next();
  }
  
  async getLeagerBoardByLeague(ctx: Context, next: () => void) {
    let leagerboard: any[] = await this.teamService.getLeagerBoardByLeague(
      ctx.params.league_id
    );
    ctx.state.data = leagerboard;
    await next();
  }
}
