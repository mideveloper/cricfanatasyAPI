import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class TeamPlayer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    league_id: number;

    @Column({ type: 'int' })
    team_id: number;

    @Column({ type: 'int' })
    player_id: number;

    @Column({ type: 'int' })
    worth: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
