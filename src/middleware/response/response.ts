import { Context } from 'koa';
import * as compose from 'koa-compose';
import { IResponse } from './IResponse';

// tslint:disable: object-literal-sort-keys
const handler = async (ctx: Context, next: () => void) => {
  if (ctx.state.data) {
    ctx.body = {} as IResponse;
    ctx.body = {
      meta: {
        status: ctx.status,
        message: ctx.state.message || 'Success',
      },
      data: ctx.state.data
    };
  }
  await next();
};

export default () => compose([
  handler,
]);
