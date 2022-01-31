import { Controller, Get, Post, Delete, Put, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findLoggedIn() {
    //
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    //
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

  @Post('/sign-in')
  async signIn() {
    //
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

  @Put()
  async update() {
    //
  }
}
