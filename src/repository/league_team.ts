import * as pino from 'pino';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { LeagueTeam } from '../entity/league_team';

const logger = pino();

@Service()
export class LeagueTeamRepository {
  constructor(@InjectRepository(LeagueTeam) private repository: Repository<LeagueTeam>) { }

  public async getByUser(userId: number): Promise<any> {
    return await this.repository.query(`
    select
      lt.id, lt."name", lt.formation_id, lt.league_id, lt.total_budget, lt.remaining_budget, lt.user_id, json_agg(json_build_array(p.id, p.player_id, p.type)) as players
    from league_team lt
    inner join league_team_player ltp on ltp.league_team_id = lt.id
    inner join player p on p.id = ltp.player_id
    where lt.user_id = ${userId} group by lt.id;`);
    // return await this.repository
    //   .createQueryBuilder('leagueTeam')
    //   .select([
    //     'leagueTeam.id as id',
    //     'leagueTeam.name as name',
    //     'leagueTeam.formation_id as formation_id',
    //     'leagueTeam.league_id as league_id',
    //     'leagueTeam.total_budget as total_budget',
    //     'leagueTeam.remaining_budget as remaining_budget',
    //     'leagueTeam.user_id as user_id',
    //     'json_agg(json_build_array(player.player_id, player.type))'
    //   ])
    //   .innerJoin('leagueTeam.leagueTeamPlayers', 'leagueTeamPlayer')
    //   .innerJoin('leagueTeamPlayer.player', 'player')
    //   .where('leagueTeam.user_id = :userId', { userId })
    //   .groupBy('leagueTeam.id')
    //   .getOne();
  }

  public create(data: LeagueTeam): Promise<LeagueTeam> {
    return this.repository.save(data);
  }

  public async delete(id: number): Promise<any> {
    await this.repository.query(`delete from league_team_player ltp where league_team_id in (${id})`);
    return await this.repository.query(`delete from league_team lt2 where id in (${id})`);
  }

  public getLeagerBoardByLeague(league_id: number): Promise<any[]> {

    return this.repository.query('SELECT lt.id AS id, lt.name AS name, u.first_name AS user_name,' +
      '(' +
      ' SELECT COALESCE(SUM(ms.points), 0) AS points FROM match_stats ms' +
      ' WHERE ms.player_id IN(' +
      'SELECT p.player_id FROM league_team_player ltp' +
      ' INNER JOIN player p ON p.id = ltp.player_id' +
      ' WHERE ltp.league_team_id = lt.id' +
      '  ) AND ms.league_id = ' + league_id + ' AND ms.created_at > lt.created_at' +
      ') AS points' +
      ' FROM league_team lt ' +
      'INNER JOIN "user" u ON u.user_id = lt.user_id WHERE lt.league_id = ' + league_id + ' order by points desc')

    // const builder = this.repository.createQueryBuilder('leagueTeam')
    //   .select([
    //     'leagueTeam.id as id',
    //     'leagueTeam.name as name',
    //     'user.first_name as user_name'
    //   ])
    //   .innerJoin('leagueTeam.user', 'user')
    //   .andWhere("league_id = :league_id", { league_id });
    // return builder.getRawMany();
  }

  public getLeagueTeamByName(league_name: String): Promise<any> {
    return this.repository.createQueryBuilder('leagueTeam')
      .where({ name: league_name }).getOne();
  }
}
