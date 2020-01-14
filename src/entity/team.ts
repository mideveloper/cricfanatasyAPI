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
import { League } from "./league";

@Entity()
export class Team extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    league_id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne((type) => League)
    @JoinColumn({ name: 'league_id' })
    league: League;
}
