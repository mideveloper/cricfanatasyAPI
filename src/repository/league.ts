import * as pino from "pino";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { League } from "../entity/league";

const logger = pino();

@Service()
export class LeagueRepository {
  constructor(
    @InjectRepository(League) private repository: Repository<League>
  ) {}

  public getLeagueBudget(id: number): Promise<League> {
    return this.repository.findOne({
      select: ["id", "name", "budget", "full_name"],
      where: { id }
    });
  }
}
