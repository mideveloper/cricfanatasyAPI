import * as pino from 'pino';
import { Service } from 'typedi';
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from '../entity/user';

const logger = pino();

@Service()
export class UserRepository {

    constructor(@InjectRepository(User) private repository: Repository<User>) {
    }

    public async save(payload: any): Promise<User> {
        let user: User = new User();
        user.first_name = payload.firstName;
        user.last_name = payload.lastName;
        user.user_name = payload.username;
        user.user_id = payload.employeeId;
        user.profile_picture = payload.profilePicture;
        return this.repository.save(user);
    }
}
