import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { CookbookComment } from './cookbookComment.entity';
import { CookbookLike } from './cookbookLike.entity';
import { RecipeCookbook } from './recipeCookbook.entity';
import { User } from './user.entity';

@Entity({ name: 'Cookbook' })
export class Cookbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: 'images/photo-mask.png' })
  image: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => CookbookComment,  comment => comment.cookbook, {
    eager: true
  })
  @JoinColumn()
  comments: CookbookComment[];

  @OneToMany(() => CookbookLike,  like => like.cookbook, {
    eager: true
  })
  @JoinColumn()
  likes: CookbookLike[];

  @OneToMany(() => RecipeCookbook,  recipe => recipe.cookbook, {
    eager: true
  })
  @JoinColumn()
  recipes: RecipeCookbook[];
}
