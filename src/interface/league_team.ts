import { player_type } from '../util/enums';

export interface CreateLeagueTeam {
  id?:number;
  userId: number;
  name: string;
  leagueId: number;
  formationId: number;
  players: number[];
}
