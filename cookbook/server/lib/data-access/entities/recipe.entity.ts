import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Cookbook } from './cookbook.entity';
import { User } from './user.entity';

@Entity({ name: 'Recipe' })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: 'images/photo-mask.png' })
  image: string;

  @Column('simple-array', { nullable: false })
  directions: string[];

  @Column('simple-array', { nullable: false })
  ingredients: string[];

  @Column({ nullable: false })
  time: number;

  @Column({ default: 0 })
  views: number;

  @OneToOne(() => User)
  @JoinColumn()
  User: User;
}
