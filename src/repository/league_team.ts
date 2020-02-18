import * as pino from 'pino';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { LeagueTeam } from '../entity/league_team';

const logger = pino();

@Service()
export class LeagueTeamRepository {
  constructor(@InjectRepository(LeagueTeam) private repository: Repository<LeagueTeam>) { }

  public create(data: LeagueTeam): Promise<LeagueTeam> {
    return this.repository.save(data);
  }

  public getLeagerBoardByLeague(league_id: number): Promise<any[]> {
    const builder = this.repository.createQueryBuilder('leagueTeam')
      .select([
        'leagueTeam.id as id',
        'leagueTeam.name as name',
        'user.first_name as user_name'
      ])
      .innerJoin('leagueTeam.user', 'user')
      .andWhere("league_id = :league_id", { league_id });
    return builder.getRawMany();
  }
}
