import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn,UpdateDateColumn} from "typeorm";


@Entity()
export class league extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { length: 200 })
    name: string;

    @Column("int")
    budget: number;
   
    @CreateDateColumn("timestamp")
    createdAt: Date;

    @UpdateDateColumn("timestamp")
    updatedAt: Date;
}