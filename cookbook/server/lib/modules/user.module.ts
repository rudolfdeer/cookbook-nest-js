import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookbookSaved } from 'lib/data-access/entities/cookbookSaved.entity';
import { RecipeSaved } from 'lib/data-access/entities/recipeSaved.entity';
import { User } from 'lib/data-access/entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, RecipeSaved, CookbookSaved])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
