import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'lib/data-access/entities/recipe.entity';
import { RecipeComment } from 'lib/data-access/entities/recipeComment.entity';
import { RecipeLike } from 'lib/data-access/entities/recipeLike.entity';
import { User } from 'lib/data-access/entities/user.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { JwtStrategy } from '../../utils/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, User, RecipeLike, RecipeComment])],
  controllers: [RecipeController],
  providers: [RecipeService, JwtStrategy],
})
export class RecipeModule {}
