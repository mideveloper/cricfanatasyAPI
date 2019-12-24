import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

export enum formation {
    formation1 = "1",
    formation2 = "2",
    formation3 = "3"
}

@Entity()
export class LeagueTeam extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'int' })
    budget: number;

    @Column({
        type: 'enum',
        enum: formation,
        default: formation.formation1
    })
    formation: formation

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
