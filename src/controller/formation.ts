import "reflect-metadata";

import { Context } from "koa";
import * as pino from "pino";
import { Service } from "typedi";
import { FormationService } from "../service/formation";
import { Formation } from "../entity/formation";

const logger = pino();

@Service()
export class FormationController {
  constructor(private formationService: FormationService) {}

  async getAllFormations(ctx: Context, next: () => void) {
    let formation: Formation[] = await this.formationService.getAllFormation();
    ctx.state.data = formation;
    await next();
  }
}
