import * as pino from 'pino';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { League } from '../entity/league';
import { LeagueGetParams } from '../representations';

const logger = pino();

@Service()
export class LeagueRepository {
  constructor(@InjectRepository(League) private repository: Repository<League>) {}

  public getLeagueById(id: number): Promise<League> {
    return this.repository.findOne({ where: { id } });
  }

  public getAllLeagues(params: LeagueGetParams): Promise<League[]> {
    const { sort, limit, order, offset } = params;
    return this.repository.find({
      skip: offset || null,
      take: limit || null,
      order: sort && order && { [sort]: order },
    });
  }

  public getBudgetByLeagueId(leagueId: number): Promise<League> {
    return this.repository.findOne({ select: ['budget'], where: { league_id: leagueId } });
  }
}
