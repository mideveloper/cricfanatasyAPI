import * as Router from "koa-router";
import { Service } from "typedi";
import { BASE_API_PREFIX } from "../util/constants";
import { LeagueController } from "../controller/league";

@Service()
export class League {
  constructor(private leagueController: LeagueController) {}

  init(): Router {
    const router = new Router({
      prefix: BASE_API_PREFIX + "league"
    });

    // Routes
    router.get("/budget/:league_id", (ctx, next) =>
      this.leagueController.getAllMatchesSchedule(ctx, next)
    );
    router.get("/budget", (ctx, next) =>
      this.leagueController.getAllMatchesSchedule(ctx, next)
    );

    return router;
  }
}
