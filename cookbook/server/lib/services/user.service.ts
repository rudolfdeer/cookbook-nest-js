import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'lib/data-access/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    //
  }

  findById(id: string): Promise<User> {
    const user = this.userRepository.findOne(id, {
      relations: [
        'savedCookbooks',
        'savedCookbooks.cookbook',
        'savedCookbooks.cookbook.user',
        'savedCookbooks.cookbook.likes',
        'savedCookbooks.cookbook.comments',
        'savedCookbooks.cookbook.comments.user',
        'savedCookbooks.cookbook.recipes',
        'savedCookbooks.cookbook.recipes.recipe',
        'savedCookbooks.cookbook.recipes.recipe.user',
        'savedCookbooks.cookbook.recipes.recipe.likes',
        'savedCookbooks.cookbook.recipes.recipe.comments',
        'savedCookbooks.cookbook.recipes.recipe.comments.user',
        'savedRecipes',
        'savedRecipes.recipe',
        'savedRecipes.recipe.user',
        'savedRecipes.recipe.likes',
        'savedRecipes.recipe.comments',
        'savedRecipes.recipe.comments.user',
      ],
    });

    return user;
  }

  async deleteById(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
