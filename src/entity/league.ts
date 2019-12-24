import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";


@Entity()
export class League extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    full_name: string;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'int' })
    budget: number;

    @Column({ type: 'date', nullable: true })
    start_date: number;

    @Column({ type: 'date', nullable: true })
    end_date: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}