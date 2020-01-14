import * as pino from "pino";
import { Service } from "typedi";
import { LeagueRepository } from "../repository/league";
import { League } from "../entity/league";

@Service()
export class LeagueService {
  constructor(private repo: LeagueRepository) {}

  public getAllLeague(league_id: number): Promise<League> {
    return this.repo.getLeagueBudget(league_id);
  }
}
