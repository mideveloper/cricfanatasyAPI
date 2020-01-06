import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn, DeleteResult,
} from 'typeorm';
import { User } from './user';

@Entity()
export class CronScheduler extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    last_fetch_date: Date;

    @Column()
    message: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
