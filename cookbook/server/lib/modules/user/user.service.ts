import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'lib/data-access/entities/user.entity';
import { comparePasswords } from 'lib/utils/auth/comparePasswords.util';
import { encryptPassword } from 'lib/utils/auth/encryptPassword.util';
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

  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  async findById(id: string | number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
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

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async signUp(body: User) {
    const { email, password } = body;

    const userInDb = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (userInDb) {
      throw new Error('user with this email already exists');
    }

    const hashedPassword = encryptPassword(password);
    const newUser = {
      email,
      password: hashedPassword,
    };

    const user = await this.userRepository.save(newUser);
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    const result = await this.findById(user.id);

    return {
      id: user.id,
      access_token: token,
      user: result,
    };
  }

  async changePassword (newPassword: string, userId: number) {
    const hashedPassword = encryptPassword(newPassword);

    await this.userRepository.update(userId, {password: hashedPassword});

    return this.findById(userId);
  }

  async changeEmail (newEmail: string, userId: number) {
    const userInDb = await this.userRepository.findOne({
      where: {
        email: newEmail,
      },
    });

    if(userInDb) {
      throw new Error ('user with this email already exists')
    }

    await this.userRepository.update(userId, {email: newEmail});
    const user = await this.userRepository.findOne(userId);

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      id: user.id,
      access_token: token,
      user,
    };
  }

  async update(body: User, userId: number) {
    await this.userRepository.update(userId, body);
    const user = await this.userRepository.findOne(userId);

    return user;
  }

  async uploadImage(id: number, fileName: string) {

    await this.userRepository.update(id, {
      image: fileName
    });

    const user = await this.findById(id);

    return user;

  }
}
