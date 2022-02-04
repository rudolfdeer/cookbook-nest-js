import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity({ name: 'Recipe_Saved' })
export class RecipeSaved {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  recipeId: number;

  @ManyToOne(() => Recipe, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe: Recipe;

  @ManyToOne(() => User, user => user.savedRecipes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
