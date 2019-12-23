import * as Router from 'koa-router';
import { Service } from 'typedi';
import { Auth } from './auth';
import { Example } from './example';

@Service()
export class Routes {
    constructor(private auth: Auth,
        private example: Example) { }

    setupAppRoutes(): Router[] {
        return [
            this.auth.init(),
            this.example.init()
        ];
    }
}
