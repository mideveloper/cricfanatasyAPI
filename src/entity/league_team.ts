import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";
export enum formation {
    formation1 = "1",
    formation2 = "2",
    formation3 = "3"
}

@Entity()
export class league_team extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { length: 200 })
    name: string;

    @Column("int")
    budget: number;

    @Column({
        type: "enum",
        enum: formation,
        default: formation.formation1
    })
    formation: formation

    @CreateDateColumn("timestamp")
    created_at: Date;

    @UpdateDateColumn("timestamp")
    updated_at: Date;
}
