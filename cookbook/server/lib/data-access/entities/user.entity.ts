import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

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
}
