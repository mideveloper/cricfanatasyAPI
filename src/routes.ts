import * as Router from 'koa-router';
import { ExampleController } from './controller';
import { Service } from 'typedi';

@Service()
export class Routes {
    constructor(private exampleController: ExampleController) { }

    setupAppRoutes(): Router {
        const router = new Router({
            prefix: '/v1',
        });

        this.initExampleAPI(router);

        return router;
    }

    initExampleAPI(router: Router) {
        router.get('/example', (ctx) => this.exampleController.get(ctx));
    }
}
