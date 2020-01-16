import { Service } from 'typedi';
import { TeamPlayerRepository } from '../repository/team_player';
import { TeamPlayer } from '../entity/team_player';

@Service()
export class TeamPlayerService {
  constructor(private repo: TeamPlayerRepository) {}

  public getAllPlayers(leagueId: number): Promise<TeamPlayer[]> {
    return this.repo.getAllPlayers(leagueId);
  }
}
