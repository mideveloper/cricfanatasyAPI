import * as pino from 'pino';
import { Service } from 'typedi';
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Match } from '../entity/match';

const logger = pino();

@Service()
export class MatchRepository {

    constructor(@InjectRepository(Match) private repository: Repository<Match>) {
    }

    public async getByDate(payload: { fromDate?: Date, toDate?: Date }): Promise<Match[]> {
        const builder = this.repository.createQueryBuilder();
        if (payload.fromDate) {
            builder.andWhere('play_date >= :fromDate')
        }
        if (payload.toDate) {
            builder.andWhere('play_date < :toDate')
        }
        return builder
            .setParameters(payload)
            .getMany();
    }
}
