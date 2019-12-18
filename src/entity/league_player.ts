import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class league_player {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("int")
    league_id: number;

    @Column("int")
    player_id: number;

    @Column("int")
    worth: number;

}
