import * as Koa from 'koa';
import { createConnection, useContainer } from 'typeorm';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as cors from 'koa-cors';
import * as pino from 'pino';
import { Routes } from './routes';
import { Container } from 'typedi';

import responseMiddleware from './middleware/response/response';
import errorMiddleware from './middleware/error';

const logger = pino();

export class Bootstrap {
  static async connectDb(): Promise<string> {
    let retries = 10;

    while (retries > 0) {
      try {
        useContainer(Container);
        await createConnection();
        logger.info(`db connected successfully`);
        return Promise.resolve(`db connected successfully`);
      } catch (ex) {
        retries--;

        logger.info(`db connection failed: `, ex);
        logger.info(`Retrying after 10 seconds`);
        logger.info(`Retries left ${retries}`);

        await new Promise(resolve => setTimeout(resolve, 10 * 1000));
      }
    }

    return Promise.reject(`unable to connect to db`);
  }

  static async createApp(port: number): Promise<string> {
    let routes: Routes = Container.get(Routes);
    let router = routes.setupAppRoutes();
    let app = new Koa();

    app.use(bodyParser());
    app.use(errorMiddleware());
    app.use(cors());

    router.forEach((apiRouter: Router) => {
      app
        .use(apiRouter.routes())
        .use(responseMiddleware());
    });

    app.listen(port);

    return Promise.resolve(`server started successfully. Running on port ${port}`);
  }
}
