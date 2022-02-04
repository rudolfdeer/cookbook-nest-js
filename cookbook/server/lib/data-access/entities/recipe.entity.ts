import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cookbook } from './cookbook.entity';
import { RecipeComment } from './recipeComment.entity';
import { RecipeLike } from './recipeLike.entity';
import { User } from './user.entity';

@Entity({ name: 'Recipe' })
export class Recipe {
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

  @Column('simple-array', { nullable: false })
  directions: string[];

  @Column('simple-array', { nullable: false })
  ingredients: string[];

  @Column({ nullable: false })
  time: number;

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => RecipeComment,  comment => comment.recipe)
  @JoinColumn()
  comments: RecipeComment[];

  @OneToMany(() => RecipeLike,  like => like.recipe)
  @JoinColumn()
  likes: RecipeLike[];
}
