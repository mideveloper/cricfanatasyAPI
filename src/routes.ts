import * as Router from 'koa-router';
import { ExampleController } from './controller';
import { Service } from 'typedi';
import { AuthController } from './controller/auth';
import {AuthMiddleware} from "./middleware/auth";

@Service()
export class Routes {
    constructor(private exampleController: ExampleController,
                private authController: AuthController) { }

    setupAppRoutes(): Router[] {
        return [
            this.initExampleAPI(),
            this.initAuthAPI(),
        ];
    }

    initExampleAPI(): Router {
        const router = new Router({
            prefix: '/v1/api/example',
        });

        // TODO: Fix auth middleware
        // Middlewares
        //router.use(AuthMiddleware.authorize);

        // Routes
        router.get('/', (ctx) => this.exampleController.get(ctx));

        return router;
    }

    initAuthAPI(): Router {
        const router = new Router({
            prefix: '/v1/api/auth',
        });

        // Routes
        router.post('/login', (ctx) => this.authController.login(ctx));

        return router;
    }
}
