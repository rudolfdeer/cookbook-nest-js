import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Cookbook' })
export class Cookbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: 'images/photo-mask.png' })
  image: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

}
