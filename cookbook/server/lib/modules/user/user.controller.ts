import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  UseGuards,
  Request,
  Res,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { multerOptions } from 'lib/constants/multer.config';
import { UserId } from 'lib/constants/user.decorator';
import { User } from 'lib/data-access/entities/user.entity';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findLoggedIn(@UserId() userId: number) {
    return this.usersService.findById(userId);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('/users/all')
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update-photo')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updatePhoto(@UserId() userId: number, @UploadedFile() file: Express.Multer.File) {
    const fileName = file.originalname;
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
  async changeEmail(
    @Body() body: { email: string },
    @UserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.usersService.changeEmail(body.email, userId);
    res.cookie('jwt', response.access_token);
    return response.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/change-password')
  async changePassword(@Body() body: { password: string }, @UserId() userId: number) {
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
  async deleteById(@UserId() userId: number, @Res({ passthrough: true }) res: Response) {
    await this.usersService.deleteById(userId);
    res.clearCookie('jwt');
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@UserId() userId: number, @Body() body: User) {
    return this.usersService.update(body, userId);
  }
}
