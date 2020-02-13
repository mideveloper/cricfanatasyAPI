/* tslint:disable:semicolon */

import * as pino from 'pino';
import Container from 'typedi';
import { MatchService } from '../service/match';
import { CricingifService } from '../service/cricingif';
import { Match } from '../entity/match';
import { MatchStatsService } from '../service/match_stats';
import { MatchStats } from '../entity/match_stats';
import { CronSchedulerService } from '../service/cron_scheduler';
const logger = pino();

export const initStatsJob = async () => {
    const matchService = Container.get(MatchService);
    const cricingIfService = Container.get(CricingifService);
    try {
        const lastFetchDate = await getLastFetchDate();
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
        await updateLastFetchDate('Finish dumping stats from: ' + lastFetchDate);
        logger.info('Finish dumping stats from: ' + lastFetchDate);
    } catch (ex) {
        logger.error(ex);
        await updateLastFetchDate('ERROR: ' + JSON.stringify(ex));
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
                    league_id: match.league_id,
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
                    points: 0
                };

                stat.points = calculatePoints(stat as MatchStats);

                stats.push(stat as MatchStats);
            }
        }
    }
    return await matchStatsService.bulkSave(stats);
}

const getLastFetchDate = async (): Promise<any> => {
    const cronSchedulerService = Container.get(CronSchedulerService);
    const exists = await cronSchedulerService.getLastFetch();
    let res = new Date(new Date().setFullYear(2001, 1, 1)).toISOString();
    if (exists) {
        res = exists.last_fetch_date.toISOString();
    }
    return res;
}

const updateLastFetchDate = async (message: string): Promise<any> => {
    const date = new Date();
    const cronSchedulerService = Container.get(CronSchedulerService);
    return cronSchedulerService.saveLastFetchDate({ date: date, message: message });
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

const calculatePoints = (stats: MatchStats): number => {
    let points = 0;

    points += stats.sixes;
    points += stats.fours;
    points += stats.runs;

    // Batting Points calculation 
    // points calculate on the basis of score
    if (stats.runs >= 30 && stats.runs < 50) {
        points += 20;
    } else if (stats.runs >= 50 && stats.runs < 100) {
        points += 50;
    } else if (stats.runs >= 100) {
        points += 150;
    }

    // plus points on the basis of strike rate
    if (stats.strike_rate < 100) {
        points -= 10;
    } else if (stats.strike_rate >= 100 && stats.strike_rate <= 150) {
        points += 10;
    } else if (stats.strike_rate > 150 && stats.strike_rate <= 200) {
        points += 20;
    } else if (stats.strike_rate > 200) {
        points += 30;
    }
    // End Batting Points calculation

    // Bowling Points calculation
    // points calculate on the basis of wickets
    points += stats.wickets * 20;
    if (stats.wickets === 4) {
        points += 150;
    } else if (stats.wickets >= 5) {
        points += 200;
    }

    // points calculate on the basis of econmy rate
    if (stats.economy_rate <= 6) {
        points += 30;
    } else if (stats.economy_rate > 6 && stats.economy_rate <= 7) {
        points += 15;
    } else if (stats.economy_rate >= 8 && stats.economy_rate <= 9) {
        points -= 10;
    } else if (stats.economy_rate > 9) {
        points -= 20;
    }

    // points calculate on the basis of hat trick
    if (stats.hat_tricks) {
        points += 200;
    }
    // End Bowler Points calculation

    return points;
}