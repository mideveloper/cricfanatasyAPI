import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn,UpdateDateColumn} from "typeorm";


@Entity()
export class match extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar")
    title: string;

    @Column("timestamp")
    play_date: Date;


    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

}

