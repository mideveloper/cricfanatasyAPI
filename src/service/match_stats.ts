/* tslint:disable:semicolon */

import * as pino from 'pino';
import { Service } from 'typedi';

const logger = pino();

@Service()
export class MatchStatsService {
    public async getMatches(matchId: string): Promise<any> {
    }
}
