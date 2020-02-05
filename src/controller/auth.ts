import 'reflect-metadata';

import { Context } from 'koa';
import * as pino from 'pino';
import { Service } from 'typedi';
import { AuthService } from '../service/auth';
import { UserDTO } from '../entity/user';

const logger = pino();

@Service()
export class AuthController {
    constructor(private authService: AuthService) { }
//hello I am testing rebase
    async login(ctx: Context, next: () => void) {
        let user: UserDTO = await this.authService.login(ctx.request.body);
        ctx.state.data = user;
        await next();
        //testing rebase2
    }
}
