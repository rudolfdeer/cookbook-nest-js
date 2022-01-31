import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'lib/data-access/entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  findAll() {
    //
  }
}
