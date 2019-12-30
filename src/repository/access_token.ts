import * as pino from 'pino';
import { Service } from 'typedi';
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { AccessToken } from '../entity/access_token';
import { User } from '../entity';

const logger = pino();

@Service()
export class AccessTokenRepository {

    constructor(@InjectRepository(AccessToken) private repository: Repository<AccessToken>) {
    }

    public async save(payload: { token: string, user: User }) {
        let token: AccessToken = new AccessToken();
        token.token = payload.token;
        token.user_id = payload.user.user_id;

        // Remove token if present and insert new
        await AccessToken.removeByUser(payload.user);
        return await this.repository.save(token);
    }
}
