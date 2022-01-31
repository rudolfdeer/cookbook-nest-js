import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  directions: string;

  @Column()
  ingredients: string;

  @Column()
  time: number;

  @Column()
  views: number;
}
