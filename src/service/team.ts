import * as pino from "pino";
import { Service } from "typedi";
import { TeamRepository } from "../repository/team";
import { Team } from "../entity/team";

@Service()
export class TeamService {
  constructor(private repo: TeamRepository) {}

  public getAllTeams(league_id: number): Promise<Team[]> {
    return this.repo.getAllTeams(league_id);
  }
}
