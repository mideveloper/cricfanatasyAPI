import * as Router from 'koa-router';
import { Service } from 'typedi';
import { ExampleController } from '../controller/example';
import { BASE_API_PREFIX } from '../util/constants';
import authentication from '../middleware/auth';

@Service()
export class Example {
    constructor(private exampleController: ExampleController) { }

    init(): Router {
        const router = new Router({
            prefix: BASE_API_PREFIX + 'example',
        });

        // Middlewares
        router.use(authentication);

        // Routes
        router.get('/', (ctx, next) => this.exampleController.get(ctx, next));

        return router;
    }
}
