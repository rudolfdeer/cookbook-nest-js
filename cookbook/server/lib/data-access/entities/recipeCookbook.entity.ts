import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Cookbook } from './cookbook.entity';
import { Recipe } from './recipe.entity';

@Entity({ name: 'Recipe_Cookbook' })
export class RecipeCookbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cookbookId: number;

  @Column({ nullable: false })
  recipeId: number;

  @ManyToOne(() => Recipe, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe: Recipe;

  @ManyToOne(() => Cookbook, cookbook => cookbook.recipes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  cookbook: Cookbook;
}
