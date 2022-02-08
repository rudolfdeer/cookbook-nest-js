import { Controller, Get, Post, Delete, Put, Param, UseGuards, Request, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from '../services/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findLoggedIn(@Request() req) {
    const userId =  req.user.id;
    return userId;
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('/users/all')
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
  async signIn(@Request() req, @Res({ passthrough: true }) res: Response) {
    const response = await this.usersService.signIn(req.user);
    res.cookie('jwt', response.access_token);
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/change-email')
  async changeEmail(@Request() req) {
    const userId =  req.user.id;
    return userId;
  }

  @Post('/change-password')
  async changePassword() {
    //
  }

  @Delete('/sign-out')
  async signIOut() {
    //
  }

  @Delete()
  async deleteById() {
    //return this.usersService.deleteById();
  }

  @Put()
  async update() {
    //
  }
}
