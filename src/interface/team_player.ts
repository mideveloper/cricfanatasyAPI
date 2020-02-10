export interface GetTeamPlayers {
  leagueId: number;
  teamId: number;
}

export interface GetTeamPlayersById {
  leagueId: number;
  players: number[];
}

export interface PlayerInfo {
  worth: string;
  player_id: number;
  team_id: number;
  player_type: string;
}
