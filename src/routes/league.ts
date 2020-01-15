import * as Router from "koa-router";
import { Service } from "typedi";
import { BASE_API_PREFIX } from "../util/constants";
import { LeagueController } from "../controller/league";
import { TeamController } from "../controller/team";

@Service()
export class League {
  constructor(
    private leagueController: LeagueController,
    private teamController: TeamController
  ) {}

  init(): Router {
    const router = new Router({
      prefix: BASE_API_PREFIX + "leagues"
    });

    // Routes
    router.get("/", (ctx, next) =>
      this.leagueController.getAllLeagues(ctx, next)
    );
    router.get("/:league_id", (ctx, next) =>
      this.leagueController.getLeagueById(ctx, next)
    );
    router.get("/:league_id/teams", (ctx, next) =>
      this.teamController.getTeamsByLeagueId(ctx, next)
    );

    return router;
  }
}
