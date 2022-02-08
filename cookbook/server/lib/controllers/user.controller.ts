import { Controller, Get, Post, Delete, Put, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'lib/modules/auth/auth.service';
import { UserService } from '../services/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findLoggedIn() {
    //
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('users/all')
  async findAll() {
    //
  }

  @Post('/update-photo')
  async updatePhoto() {
    //
  }

  @Post('/sign-up')
  async signUp() {
    //
  }

  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async signIn(@Request() req) {
    return this.usersService.signIn(req.user);
  }

  @Post('/change-email')
  async changeEmail() {
    //
  }

  @Post('/change-password')
  async changePassword() {
    //
  }

  @Delete('/sign-out')
  async signIOut() {
    //
  }

  @Delete('/')
  async deleteById() {
    //return this.usersService.deleteById();
  }

  @Put()
  async update() {
    //
  }
}
