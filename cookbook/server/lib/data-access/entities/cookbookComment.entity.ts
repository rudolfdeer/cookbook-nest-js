import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Cookbook } from './cookbook.entity';
import { User } from './user.entity';

@Entity({ name: 'Cookbook_Comment' })
export class CookbookComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  cookbookId: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Cookbook, cookbook => cookbook.comments, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  cookbook: Cookbook;
}
