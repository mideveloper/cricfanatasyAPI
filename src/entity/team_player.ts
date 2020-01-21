import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PlayersCategory } from './players_category';
import { Player } from './player';
import { Team } from './team';

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

  @ManyToOne(type => PlayersCategory)
  @JoinColumn({ name: 'category_id' })
  playerCategory: PlayersCategory;

  @ManyToOne(type => Player)
  @JoinColumn({ name: 'player_id', referencedColumnName: 'player_id' })
  player: Player;

  @ManyToOne(type => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
