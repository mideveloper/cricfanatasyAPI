import * as pino from 'pino';
import { Service } from 'typedi';
import { MatchRepository } from '../repository/match';


@Service()
export class MatchService {
    constructor(private repo: MatchRepository) { }

    public async getByDate(payload: { fromDate?: Date, toDate?: Date }): Promise<any[]> {
        return this.repo.getByDate(payload);
    }
}
