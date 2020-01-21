import 'reflect-metadata';

import { Context } from 'koa';
import * as pino from 'pino';
import { Service } from 'typedi';
import { TeamPlayerService } from '../service/team_player';
import { TeamPlayer } from '../entity/team_player';
import { GetTeamPlayers } from '../interface';

const logger = pino();

@Service()
export class TeamPlayerController {
  constructor(private teamPlayerService: TeamPlayerService) {}

  async getAllPlayers(ctx: Context, next: () => void) {
    const payload: GetTeamPlayers = {
      leagueId: +ctx.params.id,
      teamId: +ctx.request.query.teamId,
    };
    ctx.state.data = await this.teamPlayerService.getAllPlayers(payload);
    await next();
  }
}
