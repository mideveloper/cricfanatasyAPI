import * as pino from 'pino';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TeamPlayer } from '../entity/team_player';
import { GetTeamPlayers, GetTeamPlayersById, PlayerInfo } from '../interface';
import { PlayersCategory } from '../entity/players_category';

const logger = pino();

@Service()
export class TeamPlayerRepository {
  constructor(@InjectRepository(TeamPlayer) private repository: Repository<TeamPlayer>) {}

  public getAllPlayers({ leagueId, teamId }: GetTeamPlayers): Promise<TeamPlayer[]> {
    let query = this.repository
      .createQueryBuilder('teamplayer')
      .select([
        'player.name as name',
        'teamplayer.team_id as team_id',
        'teamplayer.player_id as player_id',
        'playerCategory.worth as worth',
        'player.type as player_type',
        'team.name as team_name',
      ])
      .innerJoin('teamplayer.player', 'player')
      .innerJoin('teamplayer.playerCategory', 'playerCategory')
      .innerJoin('teamplayer.team', 'team')
      .where('teamplayer.league_id = :leagueId', { leagueId });

    if (teamId) {
      query = query.andWhere('teamplayer.team_id = :teamId', { teamId });
    }

    return query.getRawMany();
  }

  public getPlayersById({ leagueId, players = [] }: GetTeamPlayersById): Promise<PlayerInfo[]> {
    let query = this.repository
      .createQueryBuilder('teamplayer')
      .select([
        // 'player.name as name',
        'teamplayer.team_id as team_id',
        // 'teamplayer.player_id as player_id',
        'playerCategory.worth as worth',
        'player.type as player_type',
        'player.id as player_id',
        // 'team.name as team_name',
      ])
      .innerJoin('teamplayer.player', 'player')
      .innerJoin('teamplayer.playerCategory', 'playerCategory')
      .innerJoin('teamplayer.team', 'team')
      .where('teamplayer.league_id = :leagueId', { leagueId })
      .andWhere('teamplayer.player_id IN (:...players)', { players });

    return query.getRawMany();
  }
}
