import * as Router from 'koa-router';
import { Service } from 'typedi';
import { Auth } from './auth';
import { Example } from './example';
import { Match } from './match';
import { Formation } from './formation';
import { League } from './league';
import { TeamPlayer } from './team_player';
import { LeagueTeam } from './league_team';

@Service()
export class Routes {
  constructor(
    private auth: Auth,
    private example: Example,
    private match: Match,
    private formation: Formation,
    private league: League,
    private teamPlayer: TeamPlayer,
    private leagueTeam: LeagueTeam,
  ) {}

  setupAppRoutes(): Router[] {
    return [
      this.auth.init(),
      this.example.init(),
      this.match.init(),
      this.formation.init(),
      this.league.init(),
      this.teamPlayer.init(),
      this.leagueTeam.init(),
    ];
  }
}
