import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { LeagueTeam } from "./league_team";
import { Player } from "./player";
import { Match } from "./match";


@Entity()
export class LeagueTeamPlayer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    league_team_id: number;

    @Column({ type: 'int' })
    player_id: number;

    @Column({ type: 'int' })
    points: number;

    @Column({ type: 'int' })
    match_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne((type) => LeagueTeam)
    @JoinColumn({name: 'league_team_id'})
    league_team: LeagueTeam;

    @ManyToOne((type) => Player)
    @JoinColumn({name: 'player_id'})
    player: Player;

    @ManyToOne((type) => Match)
    @JoinColumn({name: 'match_id'})
    match: Match;
}
