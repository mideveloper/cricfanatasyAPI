import * as Router from 'koa-router';
import { Service } from 'typedi';
import { TeamPlayerController } from '../controller/team_player';
import { BASE_API_PREFIX } from '../util/constants';

@Service()
export class TeamPlayer {
  constructor(private teamPlayerController: TeamPlayerController) {}

  init(): Router {
    const router = new Router({
      prefix: BASE_API_PREFIX + 'leagues',
    });

    // Routes
    router.get('/:id/players', (ctx, next) => this.teamPlayerController.getAllPlayers(ctx, next));

    return router;
  }
}
