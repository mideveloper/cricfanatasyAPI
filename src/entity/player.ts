import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum player_type {
    batsman = "1",
    bowler = "2",
    wicketkeeper = "3",
    allrounder = "4"
}

@Entity()
export class player extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({
        type: 'enum',
        enum: player_type,
        default: player_type.allrounder
    })
    type: player_type;

    @Column({ type: 'date' })
    dob: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}

