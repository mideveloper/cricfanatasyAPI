import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class LeaguePlayer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    league_id: number;

    @Column({ type: 'int' })
    player_id: number;

    @Column({ type: 'int' })
    worth: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
