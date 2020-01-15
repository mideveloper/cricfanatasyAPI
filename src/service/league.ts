import * as pino from "pino";
import { Service } from "typedi";
import { LeagueRepository } from "../repository/league";
import { League } from "../entity/league";
import { LeagueGetParams } from "../representations";

@Service()
export class LeagueService {
  constructor(private repo: LeagueRepository) {}

  public getLeagueById(league_id: number): Promise<League> {
    return this.repo.getLeagueById(league_id);
  }

  public getAllLeagues(params: LeagueGetParams): Promise<League[]> {
    return this.repo.getAllLeagues(params);
  }
}
