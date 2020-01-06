import 'reflect-metadata';

import { Bootstrap } from './bootstrap';
import * as pino from 'pino';

const logger = pino();
const PORT: number = 8000;

const start = (async () => {
    let db = await Bootstrap.connectDb();
    let server = await Bootstrap.createApp(PORT);

    let services = [db, server];

    Promise
        .all(services)
        .then(() => logger.info(`all required services successfully bootstrapped`))
        .catch((err) => {
            logger.error(`error occured in bootstrapping`);
            logger.error(err);
            logger.error(`exiting process..`);
            process.exit(1);
        });
})();
