import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity({ name: 'Recipe_Comment' })
export class RecipeComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  recipeId: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Recipe, recipe => recipe.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe: Recipe;
}
