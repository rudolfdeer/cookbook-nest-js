import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => User)
  @JoinColumn()
  User: User;

  @OneToOne(() => Cookbook)
  @JoinColumn()
  Cookbook: Cookbook;
}
