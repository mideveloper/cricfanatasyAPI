import 'reflect-metadata';

import { Context } from 'koa';
import * as pino from 'pino';
import { Service } from 'typedi';
import { LeagueTeamService } from '../service/league_team';
import { CreateLeagueTeam } from '../interface/league_team';

const logger = pino();

@Service()
export class LaegueTeamController {
  constructor(private leagueTeamService: LeagueTeamService) {}

  async getByUser(ctx: Context, next: () => void) {
    let leagueTeam: any = await this.leagueTeamService.getByUser(Number(ctx.user.user_id));
    ctx.state.data = leagueTeam;
    await next();
  }

  async create(ctx: Context, next: () => void) {
    const payload: CreateLeagueTeam = {
      id: ctx.request.body.id,
      userId: ctx.user.user_id,
      name: ctx.request.body.name,
      leagueId: ctx.request.body.league_id,
      players: ctx.request.body.players,
      formationId: ctx.request.body.formation_id,
    };
    let leagueTeam: any = await this.leagueTeamService.create(payload);
    ctx.state.data = leagueTeam;
    await next();
  }
}
