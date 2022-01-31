import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Cookbook } from './cookbook.entity';
import { User } from './user.entity';

@Entity({ name: 'Cookbook_Like' })
export class CookbookLike {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  User: User;

  @OneToOne(() => Cookbook)
  @JoinColumn()
  Cookbook: Cookbook;
}
