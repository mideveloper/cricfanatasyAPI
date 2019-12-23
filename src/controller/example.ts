import 'reflect-metadata';

import { Context } from 'koa';
import * as pino from 'pino';
import { Example } from '../entity';
import { Service } from 'typedi';
import { ExampleService } from '../service';

const logger = pino();

@Service()
export class ExampleController {
    constructor(private exampleService: ExampleService) { }

    async get(ctx: Context, next: () => void) {
        let example: Example = await this.exampleService.get(ctx.request.body);
        ctx.state.data = example;
        await next();
    }
}
