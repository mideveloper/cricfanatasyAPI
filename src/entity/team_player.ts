import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { PlayersCategory } from "./players_category";

@Entity()
export class TeamPlayer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    league_id: number;

    @Column({ type: 'int' })
    team_id: number;

    @Column({ type: 'int' })
    player_id: number;

    @Column({ type: 'int', nullable: true, default: null })
    category_id: number;

    @Column({ type: 'bit', nullable: true, default: '1' })
    is_active: Boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne((type) => PlayersCategory)
    @JoinColumn({ name: 'category_id' })
    playerCategory: PlayersCategory;
}
