import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
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
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => RecipeComment, (comment) => comment.recipe, {
    eager: true,
  })
  @JoinColumn()
  comments: RecipeComment[];

  @OneToMany(() => RecipeLike, (like) => like.recipe, {
    eager: true,
  })
  @JoinColumn()
  likes: RecipeLike[];
}
