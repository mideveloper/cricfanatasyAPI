import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn, DeleteResult,
} from 'typeorm';
import { User } from './user';

@Entity()
export class AccessToken extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Column("int", { nullable: true })
    user_id: number;

    @OneToOne((type) => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    static removeByUser(user: User): Promise<DeleteResult> {
        return this.createQueryBuilder()
            .delete()
            .from(AccessToken)
            .where('user = :user_id', { user_id: user.user_id })
            .execute();
    }

}
