import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Formation } from './formation';
import { League } from './league';
import { User } from './user';
import { LeagueTeamPlayer } from './league_team_player';

@Entity()
export class LeagueTeam extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'int' })
  league_id: number;

  @Column({ type: 'int' })
  total_budget: number;

  @Column({ type: 'float' })
  remaining_budget: number;

  @Column({ type: 'int' })
  formation_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(type => Formation)
  @JoinColumn({ name: 'formation_id' })
  formation: Formation;

  @ManyToOne(type => League)
  @JoinColumn({ name: 'league_id' })
  league: League;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @OneToMany(
    type => LeagueTeamPlayer,
    leagueTeamPlayer => leagueTeamPlayer.league_team,
    { cascade: true },
  )
  @JoinColumn({ referencedColumnName: 'league_team_id' })
  leagueTeamPlayers: LeagueTeamPlayer[];
}
