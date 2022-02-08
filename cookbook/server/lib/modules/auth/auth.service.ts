import { Injectable } from '@nestjs/common';
import { comparePasswords } from 'lib/utils/auth/comparePasswords.util';
import { UserService } from '../../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'lib/data-access/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && comparePasswords(password, user.password)) {
      return user;
    }

    return null;
  }

  async signIn(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
