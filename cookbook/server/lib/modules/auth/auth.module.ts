import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN } from '../../constants/auth';

@Module({
  imports: [UserModule, PassportModule,  JwtModule.register({
    secret: TOKEN.SECRET,
    signOptions: { expiresIn: TOKEN.LIFE },
  }),],
  providers: [AuthService, LocalStrategy],
  exports: [AuthModule]
})
export class AuthModule {}

