import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity({ name: 'Recipe_Like' })
export class RecipeLike {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Recipe)
  @JoinColumn()
  Recipe: Recipe;

  @OneToOne(() => User)
  @JoinColumn()
  User: User;
}
