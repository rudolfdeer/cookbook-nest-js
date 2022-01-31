import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Cookbook {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  tags: string;

  @Column()
  views: number;
}
