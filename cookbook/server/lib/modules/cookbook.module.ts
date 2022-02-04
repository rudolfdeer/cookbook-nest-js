import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { CookbookComment } from 'lib/data-access/entities/cookbookComment.entity';
import { CookbookLike } from 'lib/data-access/entities/cookbookLike.entity';
import { Recipe } from 'lib/data-access/entities/recipe.entity';
import { RecipeComment } from 'lib/data-access/entities/recipeComment.entity';
import { RecipeCookbook } from 'lib/data-access/entities/recipeCookbook.entity';
import { RecipeLike } from 'lib/data-access/entities/recipeLike.entity';
import { User } from 'lib/data-access/entities/user.entity';
import { CookbookController } from '../controllers/cookbook.controller';
import { CookbookService } from '../services/cookbook.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cookbook, User, CookbookComment, CookbookLike, RecipeCookbook, Recipe, RecipeLike, RecipeComment])],
  controllers: [CookbookController],
  providers: [CookbookService],
})
export class CookbookModule {}
