import {
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Cookbook } from './cookbook.entity';
import { User } from './user.entity';

@Entity({ name: 'Cookbook_Like' })
export class CookbookLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  cookbookId: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Cookbook)
  @JoinColumn()
  cookbook: Cookbook;
}
