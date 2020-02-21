import 'reflect-metadata';

import * as pino from 'pino';
import { Bootstrap } from '../bootstrap';
import { CronJob } from 'cron';
import { initStatsJob } from './download_match_stats';

const logger = pino();

function init() {
    new CronJob({
        cronTime: '00 00 03 * * *',
        onTick: initStatsJob,
        start: true
    });
}

const start = (async () => {
    let db = await Bootstrap.connectDb();
    let services = [db];

    Promise
        .all(services)
        .then(() => {
            logger.info(`Cron: all required services successfully bootstrapped`)
            init();
        })
        .catch((err) => {
            logger.error(`Cron: error occured in bootstrapping`);
            logger.error(err);
            logger.error(`Cron: exiting process..`);
            process.exit(1);
        });
})();
