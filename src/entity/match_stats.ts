import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";


@Entity()
export class MatchStats extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    match_id: number;

    @Column({ type: 'int' })
    player_id: number;

    @Column({ type: 'int' })
    sixes: number;

    @Column({ type: 'int' })
    fours: number;

    @Column({ type: 'int' })
    hat_tricks: number;

    @Column({ type: 'int' })
    catches: number;

    @Column({ type: 'decimal' })
    economy_rate: number;

    @Column({ type: 'int' })
    wickets: number;

    @Column({ type: 'decimal' })
    strike_rate: number;

    @Column({ type: 'int' })
    runs: number;

    @Column({ type: 'int' })
    run_outs: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}

