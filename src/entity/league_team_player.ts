import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class league_team_player extends BaseEntity {

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

    @CreateDateColumn("timestamp")
    created_at: Date;

    @UpdateDateColumn("timestamp")
    updated_at: Date;
}
