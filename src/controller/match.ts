import "reflect-metadata";

import { Context } from "koa";
import * as pino from "pino";
import { Service } from "typedi";
import { MatchService } from "../service/match";
import { Match } from "../entity/match";

const logger = pino();

@Service()
export class MatchController {
  constructor(private matchService: MatchService) {}

  async getAllMatchesSchedule(ctx: Context, next: () => void) {
    let match: Match[] = await this.matchService.getAllMatchesSchedule();
    ctx.state.data = match;
    await next();
  }
}
