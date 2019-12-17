import * as Router from 'koa-router';
import { ExampleController } from './controller';
import { Service } from 'typedi';
import { AuthController } from './controller/auth';

@Service()
export class Routes {
    constructor(private exampleController: ExampleController,
                private authController: AuthController) { }

    setupAppRoutes(): Router {
        const router = new Router({
            prefix: '/v1',
        });

        this.initExampleAPI(router);
        this.initAuthAPI(router);

        return router;
    }

    initExampleAPI(router: Router) {
        router.get('/example', (ctx) => this.exampleController.get(ctx));
    }

    initAuthAPI(router: Router) {
        router.post('/auth/login', (ctx) => this.authController.login(ctx));
    }
}
