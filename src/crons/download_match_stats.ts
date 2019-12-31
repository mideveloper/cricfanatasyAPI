/* tslint:disable:semicolon */

import * as pino from 'pino';
import Container, { Service } from 'typedi';
import { MatchService } from '../service/match';
import * as fs from 'fs';
import { CricingifService } from '../service/cricingif';
import { Match } from '../entity/match';
import { MatchStatsService } from '../service/match_stats';
import { MatchStats } from '../entity/match_stats';
const logger = pino();

export const initStatsJob = async () => {
    const matchService = Container.get(MatchService);
    const cricingIfService = Container.get(CricingifService);
    try {
        const lastFetchDate = await readLastCronTimeFromFlie();
        logger.info('Start dumping stats from: ' + lastFetchDate);
        const payload = {
            fromDate: new Date(lastFetchDate),
            toDate: new Date()
        }
        const matches = await matchService.getByDateForStats(payload);
        logger.info('Todays match found: ' + matches.length);
        for (let i = 0; i < matches.length; i++) {
            let match = matches[i];
            logger.info('Start processing for match : ' + match.id);
            const matchRes = await cricingIfService.getScoreCardByMatch(match.match_id.toString());
            if (matchRes.cc) {
                await updateMatch(match, matchRes);
                logger.info('Match Results Updated: ' + match.id);
                await saveMatchStats(match, matchRes);
                logger.info('Match Stats Updated For: ' + match.id);
            }
        }
        await updateLastCronTimeInFile();
        logger.info('Finish dumping stats from: ' + lastFetchDate);
    } catch (ex) {
        logger.error(ex);
    }
}

const updateMatch = async (match: Match, matchRes: any): Promise<Match> => {
    const matchService = Container.get(MatchService);
    match.match_result = matchRes.cc;
    match.team_1_score = matchRes.t1ts;
    match.team_2_score = matchRes.t2ts;
    match.team_1_overs = matchRes.t1o;
    match.team_2_overs = matchRes.t2o;
    match.is_stats_fetch = '1';
    return await matchService.update(match);
}

const saveMatchStats = async (match: Match, matchRes: any): Promise<void> => {
    const matchStatsService = Container.get(MatchStatsService);
    let stats: MatchStats[] = [];
    for (let i = 0; i < matchRes.in.length; i++) {
        const ining = matchRes.in[i];
        const playersKeys = Object.keys(ining).filter(key => key.startsWith('ip'));
        for (let pk = 0; pk < playersKeys.length; pk++) {
            const playerIndex = playersKeys[pk];
            const playerResult = ining[playerIndex];
            if (playerResult) {
                const stat = {
                    match_id: match.id,
                    player_id: playerResult.pl,
                    sixes: playerResult.s || 0,
                    fours: playerResult.f || 0,
                    ball_faced: playerResult.b || 0,
                    over_placed: playerResult.ov || 0,
                    wickets: playerResult.w || 0,
                    runs: playerResult.ru || 0,
                    run_conceded: playerResult.rc || 0,
                    economy_rate: calculateEconmyRate(playerResult.rc, playerResult.ov) || 0,
                    strike_rate: calculateStrikeRate(playerResult.ru, playerResult.b) || 0,
                    hat_tricks: 0,
                    catches: 0,
                    run_outs: 0,
                };
                stats.push(stat as MatchStats);
            }
        }
    }
    return await matchStatsService.bulkSave(stats);
}

const readLastCronTimeFromFlie = async (): Promise<any> => {
    const filePath = process.cwd() + '/last_cron_time.txt';
    const exists = await fs.existsSync(filePath);
    let res = null;
    if (exists) {
        res = await fs.readFileSync(filePath, { encoding: 'utf8' });
    } else {
        const date = new Date(new Date().setFullYear(2001, 1, 1)).toISOString();
        await fs.writeFileSync(filePath, date, { encoding: 'utf8' });
        res = date;
    }
    return res;
}

const updateLastCronTimeInFile = async (): Promise<any> => {
    const date = new Date();
    return await fs.writeFileSync(process.cwd() + '/last_cron_time.txt', date.toISOString(), { encoding: 'utf8' });
}

const calculateEconmyRate = (runConceded, overPlaced) => {
    const xrunConceded = runConceded || 0;
    const xoverPlaced = overPlaced || '0.0';

    return (parseFloat(xrunConceded) / parseFloat(xoverPlaced));
}

const calculateStrikeRate = (runs, ballFaced) => {
    const xruns = runs || 0;
    const xballFaced = ballFaced || '0.0';

    return ((parseFloat(xruns) / parseFloat(xballFaced)) * 100);
}