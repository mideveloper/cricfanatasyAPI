/* tslint:disable:semicolon */

import * as pino from 'pino';
import { Service } from 'typedi';
import { User } from '../entity';
import { UserLoginSchema } from '../validator';
import { AccessToken } from '../entity/access_token';
import { UserDTO } from '../entity/user';
import { COGS_LOGIN_URL } from '../util/constants';
import * as request from 'request-promise';

const logger = pino();

@Service()
export class AuthService {
    async login(data: any): Promise<UserDTO> {
        return this.verifyAuthPayload(data)
            .then(this.cogsAuth)
            .then(this.storeUserInfo)
    }

    private async verifyAuthPayload(payload: { username: string, password: string }): Promise<any> {
        await UserLoginSchema.validateAsync(payload);
        return Promise.resolve(payload);
    }

    private async cogsAuth(payload: { username: string, password: string }) {
        try {
            let result = await request({
                uri: COGS_LOGIN_URL,
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                json: true,
                body: {
                    data: {
                        type: 'auths',
                        attributes: {
                            userName: payload.username,
                            password: payload.password,
                            keepMeLoggedIn: false,
                        },
                    },
                    included: [],
                },
            });
            let data = result.data.attributes;
            return {
                firstName: data['first-name'],
                lastName: data['last-name'],
                username: data['user-name'],
                accessToken: data['access-token'],
                employeeId: data['employee-id'],
                profilePicture: data['profile-picture-url'],
            };
        } catch (ex) {
            throw { status: ex.error.errors[0].status, message: ex.error.errors[0].detail };
        }
    }

    private async storeUserInfo(cogsUser): Promise<UserDTO> {
        let user: User = new User();
        user.first_name = cogsUser.firstName;
        user.last_name = cogsUser.lastName;
        user.user_name = cogsUser.username;
        user.user_id = cogsUser.employeeId;
        user.profile_picture = cogsUser.profilePicture;

        let token: AccessToken = new AccessToken();
        token.token = cogsUser.accessToken;
        token.user = user;

        // Save or update
        await user.save();

        // Remove token if present and insert new
        await AccessToken.removeByUser(user);
        await token.save();

        let userDTO: UserDTO = Object.assign({ access_token: token.token }, user);

        return Promise.resolve(userDTO);
    }
}
