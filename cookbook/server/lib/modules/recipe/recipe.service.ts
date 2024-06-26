import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'lib/data-access/entities/recipe.entity';
import { RecipeComment } from 'lib/data-access/entities/recipeComment.entity';
import { RecipeLike } from 'lib/data-access/entities/recipeLike.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeLike)
    private recipeLikeRepository: Repository<RecipeLike>,
    @InjectRepository(RecipeComment)
    private recipeCommentRepository: Repository<RecipeComment>,
  ) {}

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.recipeRepository.find();

    return recipes;
  }

  async findById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne(id)

    return recipe;
  }

  async deleteById(id: string): Promise<void> {
    await this.recipeRepository.delete(id)
  }

  async create(body: Recipe, userId: number) {
    const newRecipe = {...body, userId}
    const recipe = await this.recipeRepository.save(newRecipe);
    const id = recipe.id;
    const result = await this.recipeRepository.findOne(id);

    return result;
  }

  async update(id: string, body: Recipe) {
    await this.recipeRepository.update(id, body);

    const recipe = await this.recipeRepository.findOne(id);

    return recipe;
  }


  async like(id: string, userId: number) {

    const instance = await this.recipeLikeRepository.find({where: {
      userId,
    }})

    if(instance) {
      await this.recipeLikeRepository.remove(instance);
    } else {
      const like = new RecipeLike();
      like.recipeId = +id;
      like.userId = userId;
      await this.recipeLikeRepository.save(like);
    }

    const recipe = await this.recipeRepository.findOne(id);
    return recipe;
  }

  async createComment(id: string, userId: number, body: RecipeComment) {
    const instance = new RecipeComment();
    instance.userId = userId;
    instance.recipeId = +id;
    instance.date = body.date;
    instance.text = body.text;

    await this.recipeCommentRepository.save(instance);

    const recipe = await this.recipeRepository.findOne(id);
    return recipe;
  }

  async uploadImage(id: string, fileName: string) {

    await this.recipeRepository.update(id, {
      image: fileName
    });

    const recipe = await this.recipeRepository.findOne(id);

    return recipe;

  }
}
