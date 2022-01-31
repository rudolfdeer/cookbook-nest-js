import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'lib/data-access/entities/recipe.entity';
import { RecipeController } from '../controllers/recipe.controller';
import { RecipeService } from '../services/recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeModule],
})
export class RecipeModule {}
