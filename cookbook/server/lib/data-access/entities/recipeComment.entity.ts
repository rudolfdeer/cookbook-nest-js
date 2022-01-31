import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => User)
  @JoinColumn()
  User: User;

  @OneToOne(() => Recipe)
  @JoinColumn()
  Recipe: Recipe;
}
