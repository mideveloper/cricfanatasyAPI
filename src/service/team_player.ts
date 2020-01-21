import { Service } from 'typedi';
import { TeamPlayerRepository } from '../repository/team_player';
import { TeamPlayer } from '../entity/team_player';
import { GetTeamPlayers } from '../interface';

@Service()
export class TeamPlayerService {
  constructor(private repo: TeamPlayerRepository) {}

  public getAllPlayers(payload: GetTeamPlayers): Promise<TeamPlayer[]> {
    return this.repo.getAllPlayers(payload);
  }
}
