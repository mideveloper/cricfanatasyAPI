import 'reflect-metadata';

import { Context } from 'koa';
import { Response } from '../util';
import * as pino from 'pino';
import { Example } from '../entity';
import { Container, Service } from 'typedi';
import { ExampleService } from '../service';

const logger = pino();

@Service()
export class ExampleController {
    constructor(private exampleService: ExampleService) {}

    async get(ctx: Context) {
        let response: Response;

        try {
            let example: Example = await this.exampleService.get(ctx.request.body);

            response = {
                status: 200,
                message: `some msg`,
                data: example,
            };

            ctx.status = 200;
        } catch (ex) {
            logger.error(ex);

            response = {
                status: 400,
                message: `${ex}`,
            };

            ctx.status = 400;
        }

        ctx.body = JSON.stringify(response);
    }
}
