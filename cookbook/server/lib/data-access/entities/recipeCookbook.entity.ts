import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Cookbook } from './cookbook.entity';
import { Recipe } from './recipe.entity';

@Entity({ name: 'Recipe_Cookbook' })
export class RecipeCookbook {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Recipe)
  @JoinColumn()
  Recipe: Recipe;

  @OneToOne(() => Cookbook)
  @JoinColumn()
  Cookbook: Cookbook;
}
