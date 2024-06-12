import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../utils/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN } from '../../constants/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookbookSaved } from 'lib/data-access/entities/cookbookSaved.entity';
import { RecipeSaved } from 'lib/data-access/entities/recipeSaved.entity';
import { User } from 'lib/data-access/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from '../../utils/strategies/jwt.strategy';

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
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
