/* tslint:disable:semicolon */

import * as pino from 'pino';
import { Service } from 'typedi';
import { CRICINGIF_URL } from '../util/constants';
import * as request from 'request-promise';

const logger = pino();

@Service()
export class CricingifService {
    constructor() { }

    public async getScoreCardByMatch(matchId: string): Promise<any> {
        try {
            let result = await request({
                uri: CRICINGIF_URL.BASE_URL + '' + CRICINGIF_URL.FULL_SCORE_CARD.replace('{matchId}', matchId),
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                json: true
            });
            return result;
        } catch (ex) {
            throw { status: ex.status, message: ex.title };
        }
    }
}
