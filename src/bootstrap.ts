import * as Koa from 'koa';
import { createConnection } from 'typeorm';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as pino from 'pino';

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

    static async createApp(port: number, router: Router): Promise<string> {
        const app = new Koa();

        app
            .use(bodyParser())
            .use(router.routes())
            .use(router.allowedMethods())
            .listen(port);

        return Promise.resolve(`server started successfully. Running on port ${port}`);
    }
}
