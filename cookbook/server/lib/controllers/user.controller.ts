import { Controller, Get, Post, Delete, Put, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'lib/guards/auth.guard';
import { UserService } from '../services/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
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

  @Delete('/')
  async deleteById() {
    //return this.usersService.deleteById();
  }

  @Put()
  async update() {
    //
  }
}
