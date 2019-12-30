import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    OneToOne,
    ManyToMany,
    ManyToOne
} from "typeorm";
import { League } from "./league";


@Entity()
export class Match extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    match_id: number;

    @Column({ type: 'int' })
    league_id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    team_1: string;

    @Column({ type: 'varchar' })
    team_2: string;

    @Column({ type: 'timestamp' })
    play_date: Date;

    @Column({ type: 'varchar' })
    play_time: string;

    @Column({ type: 'varchar', nullable: true })
    match_result: string;

    @Column({ type: 'int' })
    match_overs: number;

    @Column({ type: 'varchar', nullable: true })
    team_1_score: string;

    @Column({ type: 'varchar', nullable: true })
    team_1_overs: string;

    @Column({ type: 'varchar', nullable: true })
    team_2_score: string;

    @Column({ type: 'varchar', nullable: true })
    team_2_overs: string;

    @Column({ type: 'varchar', nullable: true })
    stadium: string;

    @Column({ type: 'varchar', nullable: true })
    city: string;

    @Column({ type: 'varchar', nullable: true })
    country: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne((type) => League)
    @JoinColumn({ name: 'league_id' })
    league: League;
}

