import { Service } from 'typedi';
import { MatchStatsRepository } from '../repository/match_stats';
import { MatchStats } from '../entity/match_stats';

@Service()
export class MatchStatsService {
    constructor(private repo: MatchStatsRepository) { }

    public async bulkSave(matchStats: MatchStats[]) {
        return await this.repo.bulkSave(matchStats);
    }
}
