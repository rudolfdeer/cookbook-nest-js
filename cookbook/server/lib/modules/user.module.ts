import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../modules/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN } from '../constants/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookbookSaved } from 'lib/data-access/entities/cookbookSaved.entity';
import { RecipeSaved } from 'lib/data-access/entities/recipeSaved.entity';
import { User } from 'lib/data-access/entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([User, RecipeSaved, CookbookSaved])],
//   controllers: [UserController],
//   providers: [UserService],
//   exports: [UserService]
// })
// export class UserModule {}

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RecipeSaved, CookbookSaved]),
    PassportModule,
    JwtModule.register({
      secret: TOKEN.SECRET,
      signOptions: { expiresIn: TOKEN.LIFE },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy],
  exports: [UserService],
})
export class UserModule {}
