import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'lib/constants/multer.config';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { CookbookComment } from 'lib/data-access/entities/cookbookComment.entity';
import { CookbookService } from './cookbook.service';

@Controller('api/cookbooks')
export class CookbookController {
  constructor(private readonly cookbooksService: CookbookService) {}

  @Get()
  findAll() {
    return this.cookbooksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.cookbooksService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: Cookbook, @Request() req) {
    const userId = req.user.id;
    return this.cookbooksService.create(body, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  async createComment(@Param('id') id: string, @Body() body: CookbookComment, @Request() req) {
    const userId = req.user.id;
    return this.cookbooksService.createComment(id, userId, body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/like')
  async like(@Param('id') id: string,  @Request() req) {
    const userId = req.user.id;
    return this.cookbooksService.like(id, userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const fileName = file.originalname;
    
    return this.cookbooksService.uploadImage(id, fileName);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.cookbooksService.deleteById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Cookbook) {
    return this.cookbooksService.update(id, body);
  }
}
