import * as pino from "pino";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Match } from "../entity/match";

const logger = pino();

@Service()
export class MatchRepository {
  constructor(@InjectRepository(Match) private repository: Repository<Match>) { }

  public async getByDateForStats(payload: {
    fromDate?: Date;
    toDate?: Date;
  }): Promise<Match[]> {
    const builder = this.repository.createQueryBuilder();
    if (payload.fromDate) {
      builder.andWhere("play_date >= :fromDate");
    }
    if (payload.toDate) {
      builder.andWhere("play_date <= :toDate");
    }
    builder.andWhere(`is_stats_fetch='0'`);
    return builder.setParameters(payload).getMany();
  }

  public async update(match: Match): Promise<Match> {
    return await this.repository.save(match);
  }

  public getAllMatchesSchedule(league_id: number): Promise<Match[]> {
    return this.repository.find({
      where: { league_id: league_id },
      order: { play_date: 'ASC' }
    });
  }
}
