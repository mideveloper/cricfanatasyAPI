import * as Router from 'koa-router';
import { Service } from 'typedi';
import { AuthController } from '../controller/auth';
import { BASE_API_PREFIX } from '../util/constants';

@Service()
export class Auth {
    constructor(private authController: AuthController) { }

    init(): Router {
        const router = new Router({
            prefix: BASE_API_PREFIX + 'auth',
        });

        router.post('/login', (ctx, next) => this.authController.login(ctx, next));

        return router;
    }
}
