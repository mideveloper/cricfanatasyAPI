import * as Koa from 'koa';
import { createConnection } from 'typeorm';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as pino from 'pino';
import {Routes} from "./routes";
import {Container} from "typedi";

const logger = pino();

export class Bootstrap {
    static async connectDb(): Promise<string> {
        let retries = 10;

        while (retries > 0) {
            try {
                await createConnection();
                logger.info(`db connected successfully`);
                return Promise.resolve(`db connected successfully`);
            } catch (ex) {
                retries--;

                logger.info(`db connection failed: `, ex);
                logger.info(`Retrying after 10 seconds`);
                logger.info(`Retries left ${retries}`);

                await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
            }
        }

        return Promise.reject(`unable to connect to db`);
    }

    static async createApp(port: number): Promise<string> {
        let routes: Routes = Container.get(Routes);
        let router = routes.setupAppRoutes();
        let app = new Koa();

        app.use(bodyParser());

        router.forEach((apiRouter: Router) => {
            app
                .use(apiRouter.routes())
                .use(apiRouter.middleware());
        });

        app.listen(port);

        return Promise.resolve(`server started successfully. Running on port ${port}`);
    }
}
