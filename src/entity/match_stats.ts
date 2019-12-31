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
import { Match } from "./match";
import { Player } from "./player";


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

    @Column({ type: 'int' })
    ball_faced: number;

    @Column({ type: 'varchar', length: 50 })
    over_placed: string;

    @Column({ type: 'int' })
    run_conceded: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne((type) => Match)
    @JoinColumn({ name: 'match_id' })
    match: Match;
}

