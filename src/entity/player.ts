import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { player_type } from "../util/enums";

@Entity()
export class Player extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    player_id: number;

    @Column({ type: 'varchar', length: 200 })
    full_name: string;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({
        type: 'enum',
        enum: player_type,
        default: player_type.All_Rounder
    })
    type: player_type;

    @Column({ type: 'varchar', nullable: true })
    skills: string;

    @Column({ type: 'date', nullable: true })
    dob: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
