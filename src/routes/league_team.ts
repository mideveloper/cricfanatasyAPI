import * as Router from 'koa-router';
import { Service } from 'typedi';
import { BASE_API_PREFIX } from '../util/constants';
import authentication from '../middleware/auth';
import { LaegueTeamController } from '../controller/league_team';

@Service()
export class LeagueTeam {
    constructor(private laegueTeamController: LaegueTeamController) { }

    init(): Router {
        const router = new Router({
            prefix: BASE_API_PREFIX + 'league-team',
        });

        // Middlewares
        router.use(authentication);

        // Routes
        router.post('/', (ctx, next) => this.laegueTeamController.create(ctx, next));

        return router;
    }
}
