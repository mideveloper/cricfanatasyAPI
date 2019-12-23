import { Context } from 'koa';
import * as compose from 'koa-compose';

const handler = async (ctx: Context, next: () => void) => {
    try {
        await next();
    } catch (error) {
        if (error.isBoom) {
            ctx.body = error.output.payload;
            ctx.status = error.output.statusCode;
        } else {
            ctx.body = {
                meta: {
                    message: error.message || 'Something went wrong!',
                    status: +error.status || 500,
                },
            },
                ctx.status = +error.status || 500;
        }
    }
};

export default () => compose([
    handler,
]);
