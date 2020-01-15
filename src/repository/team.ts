import * as pino from "pino";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Team } from "../entity/team";

const logger = pino();

@Service()
export class TeamRepository {
  constructor(@InjectRepository(Team) private repository: Repository<Team>) {}

  public getTeamsByLeagueId(league_id: number): Promise<Team[]> {
    return this.repository.find({ where: { league_id } });
  }
}
