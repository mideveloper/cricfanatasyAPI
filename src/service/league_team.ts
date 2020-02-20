/* tslint:disable:semicolon */

import * as pino from 'pino';
import { Service } from 'typedi';
import { LeagueTeamRepository } from '../repository/league_team';
import { CreateLeagueTeamSchema } from '../validator/league_team';
import { CreateLeagueTeam } from '../interface/league_team';
import { TeamPlayerRepository } from '../repository/team_player';
import { FormationRepository } from '../repository/formation';
import { badRequest } from '@hapi/boom';
import { LeagueRepository } from '../repository/league';
import { player_type } from '../util/enums';
import { LeagueTeam } from '../entity/league_team';
import { LeagueTeamPlayer } from '../entity/league_team_player';

const logger = pino();

@Service()
export class LeagueTeamService {
  private formation = null;
  private players = null;
  private totalBudget = null;
  private remainingBudget = null;

  constructor(
    private repo: LeagueTeamRepository,
    private teamPlayerRepo: TeamPlayerRepository,
    private formationRepo: FormationRepository,
    private leagueRepo: LeagueRepository,
  ) { }

  async getByUser(userId: number): Promise<any> {
    return this.repo.getByUser(userId);
  }

  async create(payload: CreateLeagueTeam): Promise<any> {
    await this.verifyCreatePayloadPayload(payload);

    if (payload.id && payload.id > 0) {
      const leag = await this.leagueRepo.getLeagueById(payload.leagueId);
      const league_date = new Date(leag.start_date + ' 18:00:00');
      if (new Date() > league_date) {
        throw badRequest('Team cannot be editable after league start.');
      }
    }

    const exists_team = await this.repo.getLeagueTeamByName(payload.name.trim());
    if (exists_team) {
      if (exists_team.id != payload.id) {
        throw badRequest('Team name aready exists');
      }
    }

    if (payload.id) {
      await this.repo.delete(Number(payload.id));
    }

    [this.formation, this.players, this.totalBudget] = await Promise.all([
      this.formationRepo.getFormationById(payload.formationId),
      this.teamPlayerRepo.getPlayersById({ leagueId: payload.leagueId, players: payload.players }),
      this.leagueRepo.getBudgetByLeagueId(payload.leagueId),
    ]);
    this.formationAndBudgetCheck();
    const leagueTeam = new LeagueTeam();
    leagueTeam.formation_id = payload.formationId;
    leagueTeam.name = payload.name.trim();
    leagueTeam.league_id = payload.leagueId;
    leagueTeam.remaining_budget = this.remainingBudget;
    leagueTeam.total_budget = this.totalBudget.budget;
    leagueTeam.user_id = payload.userId;
    leagueTeam.leagueTeamPlayers = new Array<LeagueTeamPlayer>();
    for (const i of this.players) {
      let player = new LeagueTeamPlayer();
      player.player_id = i.player_id;
      player.points = 0;
      leagueTeam.leagueTeamPlayers.push(player);
    }
    return this.repo.create(leagueTeam);
  }

  private formationAndBudgetCheck() {
    let selectedBudget = 0;
    let batsmen = 0;
    let bowlers = 0;
    let allRounders = 0;
    let wicketKeeper = 0;

    this.players.forEach(player => {
      switch (player.player_type) {
        case player_type.Batsman:
          batsmen++;
          break;
        case player_type.Bowler:
          bowlers++;
          break;
        case player_type.Wicket_Keeper:
          wicketKeeper++;
          break;
        case player_type.All_Rounder:
          allRounders++;
          break;
        default:
          break;
      }
      selectedBudget += +player.worth;
    });

    this.remainingBudget = this.totalBudget.budget - selectedBudget;

    if (selectedBudget > this.totalBudget.budget) {
      throw badRequest('Budget exceeds');
    }

    if (
      this.formation.batsman !== batsmen &&
      this.formation.bowler !== bowlers &&
      this.formation.all_rounder !== allRounders &&
      this.formation.wicket_keeper !== wicketKeeper
    ) {
      throw badRequest('Formation does not match');
    }
  }

  private async verifyCreatePayloadPayload(payload: CreateLeagueTeam) {
    try {
      await CreateLeagueTeamSchema.validateAsync(payload);
    } catch (err) {
      throw badRequest(err);
    }
  }
}
