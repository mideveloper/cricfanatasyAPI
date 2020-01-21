import * as pino from "pino";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { LeagueTeam } from "../entity/league_team";

const logger = pino();

@Service()
export class LeagueTeamRepository {
  constructor(
    @InjectRepository(LeagueTeam) private repository: Repository<LeagueTeam>
  ) {}

  public create(): Promise<LeagueTeam[]> {
    return null;
  }
}
