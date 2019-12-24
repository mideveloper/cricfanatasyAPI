import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";


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
}
