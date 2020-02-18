/* tslint:disable:semicolon */

import * as pino from 'pino';
import { Service } from 'typedi';
import { UserLoginSchema } from '../validator';
import { UserDTO } from '../entity/user';
import { COGS_LOGIN_URL } from '../util/constants';
import * as request from 'request-promise';
import { UserRepository } from '../repository/user';
import { AccessTokenRepository } from '../repository/access_token';
import { LeagueRepository } from '../repository/league';;

const logger = pino();

@Service()
export class AuthService {

    constructor(
        private repo: UserRepository,
        private accessTokenRepo: AccessTokenRepository,
        private leagueRepo: LeagueRepository
    ) { }

    async login(data: any): Promise<UserDTO> {
        const payload = await this.verifyAuthPayload(data);
        const cogsUser = await this.cogsAuth(payload);
        return await this.storeUserInfo(cogsUser);
    }

    private async verifyAuthPayload(payload: { username: string, password: string }) {
        await UserLoginSchema.validateAsync(payload);
        return payload;
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
        const league = await this.leagueRepo.getLeagueById(2);
        cogsUser.total_budget = league.budget;
        const user = await this.repo.save(cogsUser);
        const token = await this.accessTokenRepo.save({ token: cogsUser.accessToken, user: user });
        let userDTO: UserDTO = Object.assign({ access_token: token.token }, user);
        return Promise.resolve(userDTO);
    }
}
