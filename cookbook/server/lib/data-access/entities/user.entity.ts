import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { CookbookSaved } from './cookbookSaved.entity';
import { RecipeSaved } from './recipeSaved.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: 'images/photo-mask.png' })
  image: string;

  @Column({ default: 'No bio.' })
  bio: string;

  @OneToMany(() => CookbookSaved,  cookbook => cookbook.cookbook)
  @JoinColumn()
  savedCookbooks: CookbookSaved[];

  @OneToMany(() => RecipeSaved,  recipe => recipe.recipe)
  @JoinColumn()
  savedRecipes: RecipeSaved[];
}
