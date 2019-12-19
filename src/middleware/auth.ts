import { AccessToken } from '../entity/access-token';
import { Context } from 'koa';

export class AuthMiddleware {
    static async authorize(ctx: Context): Promise<boolean> {
        try {
            let token = ctx.request.header.authorization.split(' ')[1];
            let result = await AccessToken.findOne({ token }, { relations: ['user'] });

            if (!result) {
                // TODO: throw proper error
                throw new Error('auth failed');
            }

            ctx.user = result.user;
            return Promise.resolve(true);
        } catch (ex) {
            return Promise.resolve(false);
        }
    }
}
