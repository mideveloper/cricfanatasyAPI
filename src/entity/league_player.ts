import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class league_player extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("int")
    league_id: number;

    @Column("int")
    player_id: number;

    @Column("int")
    worth: number;

    @CreateDateColumn("timestamp")
    created_at: Date;

    @UpdateDateColumn("timestamp")
    updated_at: Date;
}
