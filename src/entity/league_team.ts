import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
export enum formation {
    formation1 = "1",
    formation2 = "2",
    formation3 = "3"
}

@Entity()
export class league_team {

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

}
