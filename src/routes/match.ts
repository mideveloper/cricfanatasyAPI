import * as Router from "koa-router";
import { Service } from "typedi";
import { MatchController } from "../controller/match";
import { BASE_API_PREFIX } from "../util/constants";
import authentication from "../middleware/auth";

@Service()
export class Match {
  constructor(private matchController: MatchController) {}

  init(): Router {
    const router = new Router({
      prefix: BASE_API_PREFIX + "matches"
    });

    // Routes
    router.get("/schedule", (ctx, next) =>
      this.matchController.getAllMatchesSchedule(ctx, next)
    );

    return router;
  }
}
