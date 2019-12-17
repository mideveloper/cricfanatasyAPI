import 'reflect-metadata';

import { Context } from 'koa';
import { Response } from '../util';
import * as pino from 'pino';
import { Container, Service } from 'typedi';
import { AuthService } from '../service/auth';
import { UserDTO } from '../entity/user';

const logger = pino();

@Service()
export class AuthController {
    constructor(private authService: AuthService) {}

    async login(ctx: Context) {
        let response: Response;

        try {
            let user: UserDTO = await this.authService.login(ctx.request.body);

            response = {
                status: 200,
                message: `loggedin successfully`,
                data: user,
            };

            ctx.status = 200;
        } catch (ex) {
            logger.error(ex);
            response = ex;
            ctx.status = 400;
        }

        ctx.body = JSON.stringify(response);
    }
}
