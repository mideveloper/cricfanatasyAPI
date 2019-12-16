/* tslint:disable:semicolon */

import * as pino from 'pino';
import { Service } from 'typedi';
import { Example } from '../entity';

const logger = pino();

@Service()
export class ExampleService {
    async get(data: any): Promise<Example> {
        return Promise.resolve(new Example())
    }

}
