import { Service } from 'typedi';
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { MatchStats } from '../entity/match_stats';

@Service()
export class MatchStatsRepository {

    constructor(@InjectRepository(MatchStats) private repository: Repository<MatchStats>) {
    }

    public async bulkSave(matchStats: MatchStats[]) {
        this.repository.save(matchStats);
    }
}
