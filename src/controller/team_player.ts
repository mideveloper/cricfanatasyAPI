import 'reflect-metadata';

import { Context } from 'koa';
import * as pino from 'pino';
import { Service } from 'typedi';
import { TeamPlayerService } from '../service/team_player';
import { TeamPlayer } from '../entity/team_player';

const logger = pino();

@Service()
export class TeamPlayerController {
  constructor(private teamPlayerService: TeamPlayerService) {}

  async getAllPlayers(ctx: Context, next: () => void) {
    const leagueId = +ctx.params.id;
    ctx.state.data = await this.teamPlayerService.getAllPlayers(leagueId);
    await next();
  }
}
