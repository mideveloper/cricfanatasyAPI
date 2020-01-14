import * as Router from "koa-router";
import { Service } from "typedi";
import { BASE_API_PREFIX } from "../util/constants";
import { FormationController } from "../controller/formation";

@Service()
export class Formation {
  constructor(private formationController: FormationController) {}

  init(): Router {
    const router = new Router({
      prefix: BASE_API_PREFIX + "formations"
    });

    // Routes
    router.get("/", (ctx, next) =>
      this.formationController.getAllFormations(ctx, next)
    );

    return router;
  }
}
