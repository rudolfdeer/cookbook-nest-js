import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'lib/data-access/entities/user.entity';
import { comparePasswords } from 'lib/utils/auth/comparePasswords.util';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && comparePasswords(password, user.password)) {
      return user;
    }

    return null;
  }

  async signIn(user: User) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      id: user.id,
      access_token: token,
    };
  }

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

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async deleteById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
