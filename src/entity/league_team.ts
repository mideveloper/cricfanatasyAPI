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
} from 'typeorm';
import { formation } from '../util/enums';
import { Formation } from './formation';

@Entity()
export class LeagueTeam extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'int' })
    budget: number;

    @Column({ type: 'int' })
    formation_id: number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne((type) => Formation)
    @JoinColumn({name: 'formation_id'})
    formation: Formation;
}
