import * as pino from "pino";
import { Service } from "typedi";
import { MatchRepository } from "../repository/match";
import { Match } from "../entity/match";

@Service()
export class MatchService {
  constructor(private repo: MatchRepository) {}

  public async getByDateForStats(payload: {
    fromDate?: Date;
    toDate?: Date;
  }): Promise<Match[]> {
    return this.repo.getByDateForStats(payload);
  }

  public async update(match: Match): Promise<Match> {
    return await this.repo.update(match);
  }

  public getAllMatchesSchedule(league_id: number): Promise<Match[]> {
    return this.repo.getAllMatchesSchedule(league_id);
  }
}
