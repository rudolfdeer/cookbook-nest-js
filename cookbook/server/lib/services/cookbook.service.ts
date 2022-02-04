import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { CookbookLike } from 'lib/data-access/entities/cookbookLike.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class CookbookService {
  constructor(
    @InjectRepository(Cookbook)
    private cookbookRepository: Repository<Cookbook>,
  ) {}

  async findAll(): Promise<Cookbook[]> {
    const cookbooks = await this.cookbookRepository.find({
      relations: [
        'user',
        'comments',
        'comments.user',
        'likes',
        'recipes',
        'recipes.recipe',
        'recipes.recipe.user',
        'recipes.recipe.likes',
        'recipes.recipe.comments', 
        'recipes.recipe.comments.user',
      ],
    });

    return cookbooks;
  }
}
