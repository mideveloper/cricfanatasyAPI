import 'reflect-metadata';

import { Bootstrap } from './bootstrap';
import * as pino from 'pino';
import { Container } from 'typedi';
import { Routes } from './routes';

const logger = pino();
const PORT: number = 3000;
const start = (async () => {
    let routes: Routes = Container.get(Routes);
    let router = routes.setupAppRoutes();
    let db = Bootstrap.connectDb();
    let server = Bootstrap.createApp(PORT, router);

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
