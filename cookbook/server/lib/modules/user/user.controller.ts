import { Controller, Get, Post, Delete, Put, Param, UseGuards, Request, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from 'lib/data-access/entities/user.entity';
import { UserService } from './user.service';

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
  async signUp(@Body() body: User, @Res({ passthrough: true }) res: Response) {
    const response = await this.usersService.signUp(body);
    res.cookie('jwt', response.access_token);

    return response.user;
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
    //
    const userId =  req.user.id;
    return userId;
  }

  @Post('/change-password')
  async changePassword() {
    //
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/sign-out')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteById(@Request() req, @Res({ passthrough: true }) res: Response) {
    const userId =  req.user.id;
    await this.usersService.deleteById(userId);
    res.clearCookie('jwt');
    return null;
  }

  @Put()
  async update() {
    //
  }
}
