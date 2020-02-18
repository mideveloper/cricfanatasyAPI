import * as pino from "pino";
import { Service } from "typedi";
import { TeamRepository } from "../repository/team";
import { Team } from "../entity/team";
import { LeagueTeamRepository } from "../repository/league_team";

@Service()
export class TeamService {
  constructor(private repo: TeamRepository, private leagueTeamRepo: LeagueTeamRepository) { }

  public getTeamsByLeagueId(league_id: number): Promise<Team[]> {
    return this.repo.getTeamsByLeagueId(league_id);
  }

  public getLeagerBoardByLeague(league_id: number): Promise<any[]> {
    return this.leagueTeamRepo.getLeagerBoardByLeague(league_id);
  }
}
