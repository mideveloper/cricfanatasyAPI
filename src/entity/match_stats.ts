import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn,UpdateDateColumn} from "typeorm";


@Entity()
export class match_stats extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("int")
    match_id: number;

    @Column("int")
    player_id: number;

    @Column("int")
    sixes: number;

    @Column("int")
    fours: number;
    
    @Column("int")
    hat_tricks: number;
    
    @Column("int")
    catches: number;
    
    @Column()
    economy_rate: number;

    @Column("int")
    wickets: number;
    
    @Column()
    strike_rate: number;

    @Column("int")
    runs : number;

    @Column("int")
    run_outs : number;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

}

