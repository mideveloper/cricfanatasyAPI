import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Formation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'int' })
    total_player: number;

    @Column({ type: 'int' })
    batsman: number;

    @Column({ type: 'int' })
    bowler: number;

    @Column({ type: 'int' })
    all_rounder: number;

    @Column({ type: 'int' })
    wicket_keeper: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
