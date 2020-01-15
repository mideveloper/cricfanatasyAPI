import * as pino from "pino";
import { Service } from "typedi";
import { TeamRepository } from "../repository/team";
import { Team } from "../entity/team";

@Service()
export class TeamService {
  constructor(private repo: TeamRepository) {}

  public getTeamsByLeagueId(league_id: number): Promise<Team[]> {
    return this.repo.getTeamsByLeagueId(league_id);
  }
}
