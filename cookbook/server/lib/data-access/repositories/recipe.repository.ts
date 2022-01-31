import { getRepository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';

const recipeRepository = getRepository(Recipe);
