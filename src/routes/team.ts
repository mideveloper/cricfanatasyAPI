import * as Router from "koa-router";
import { Service } from "typedi";
import { BASE_API_PREFIX } from "../util/constants";
import { TeamController } from "../controller/team";

@Service()
export class Team {
  constructor(private teamController: TeamController) {}

  init(): Router {
    const router = new Router({
      prefix: BASE_API_PREFIX + "teams"
    });

    // Routes
    router.get("/", (ctx, next) =>
      this.teamController.getAllTeams(ctx, next)
    );

    return router;
  }
}
