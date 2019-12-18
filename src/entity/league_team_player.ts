import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class league_team_player {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("int")
    league_team_id: number;

    @Column("int")
    player_id: number;

    @Column("int")
    points: number;

    @Column("int")
    match_id: number;
}
