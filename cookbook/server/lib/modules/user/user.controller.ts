import { Controller, Get, Post, Delete, Put, Param, UseGuards, Request, Res, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { multerOptions } from 'lib/constants/multer.config';
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
    return this.usersService.findAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update-photo')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updatePhoto(@Request() req, @UploadedFile() file: Express.Multer.File) {
    const fileName = file.originalname;
    const userId =  req.user.id;
    
    return this.usersService.uploadImage(userId, fileName);
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
  async changeEmail(@Body() body: {email: string}, @Request() req, @Res({ passthrough: true }) res: Response) {
    const userId =  req.user.id;
    const response = await this.usersService.changeEmail(body.email, userId);
    res.cookie('jwt', response.access_token);
    return response.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/change-password')
  async changePassword(@Body() body: {password: string}, @Request() req) {
    const userId =  req.user.id;
    return this.usersService.changePassword(body.password, userId);
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

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Request() req, @Body() body: User) {
    const userId =  req.user.id;
    return this.usersService.update(body, userId);
  }
}
