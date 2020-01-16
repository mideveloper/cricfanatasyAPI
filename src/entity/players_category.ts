import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { League } from "./league";

@Entity()
export class PlayersCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    league_id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'decimal', default: 0 })
    worth: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne((type) => League)
    @JoinColumn({ name: 'league_id' })
    league: League;
}
