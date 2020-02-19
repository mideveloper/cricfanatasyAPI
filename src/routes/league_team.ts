import * as Router from 'koa-router';
import { Service } from 'typedi';
import { BASE_API_PREFIX } from '../util/constants';
import authentication from '../middleware/auth';
import { LaegueTeamController } from '../controller/league_team';

@Service()
export class LeagueTeam {
  constructor(private leagueTeamController: LaegueTeamController) {}

  init(): Router {
    const router = new Router({
      prefix: BASE_API_PREFIX + 'league-team',
    });

    // Middlewares
    router.use(authentication);

    // Routes
    router.post('/', (ctx, next) => this.leagueTeamController.create(ctx, next));

    router.get('/', (ctx, next) => {
      return this.leagueTeamController.getByUser(ctx, next)
    });

    return router;
  }
}
