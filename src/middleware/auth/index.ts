import { AccessToken } from '../../entity/access_token';
import { Context } from 'koa';
import * as Boom from '@hapi/boom';

const authentication = async (ctx: Context, next: () => void) => {
    try {
        const headers = ctx.request.header;
        let token = headers.authorization ? headers.authorization : null;
        if (!token) {
            throw Boom.unauthorized('You are not authorize to perform this action.');
        }

        let result = await AccessToken.findOne({ token }, { relations: ['user'] });
        if (!result) {
            throw Boom.unauthorized('You are not authorize to perform this action.');
        }
        ctx.user = result.user;
        return next();
    } catch (ex) {
        ctx.status = 401;
        throw Boom.unauthorized('You are not authorize to perform this action.');
    }
}

export default authentication;