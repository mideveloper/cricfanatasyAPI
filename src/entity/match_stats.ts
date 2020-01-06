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

    @Column({ type: 'int', default: 0 })
    sixes: number;

    @Column({ type: 'int', default: 0 })
    fours: number;

    @Column({ type: 'int', default: 0 })
    hat_tricks: number;

    @Column({ type: 'int', default: 0 })
    catches: number;

    @Column({ type: 'decimal', default: 0 })
    economy_rate: number;

    @Column({ type: 'int', default: 0 })
    wickets: number;

    @Column({ type: 'decimal', default: 0 })
    strike_rate: number;

    @Column({ type: 'int', default: 0 })
    runs: number;

    @Column({ type: 'int', default: 0 })
    run_outs: number;

    @Column({ type: 'int', default: 0 })
    ball_faced: number;

    @Column({ type: 'varchar', length: 50 })
    over_placed: string;

    @Column({ type: 'int', default: 0 })
    run_conceded: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne((type) => Match)
    @JoinColumn({ name: 'match_id' })
    match: Match;
}

