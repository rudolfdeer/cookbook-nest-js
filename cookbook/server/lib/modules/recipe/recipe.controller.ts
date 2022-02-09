import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'lib/constants/multer.config';
import { Recipe } from 'lib/data-access/entities/recipe.entity';
import { RecipeComment } from 'lib/data-access/entities/recipeComment.entity';
import { RecipeService } from './recipe.service';

@Controller('api/recipes')
export class RecipeController {
  constructor(private readonly recipesService: RecipeService) {}

  @Get()
  findAll() {
    return this.recipesService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.recipesService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: Recipe, @Request() req) {
    const userId = req.user.id;
    return this.recipesService.create(body, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  async createComment(@Param('id') id: string, @Body() body: RecipeComment, @Request() req) {
    const userId = req.user.id;
    return this.recipesService.createComment(id, userId, body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/like')
  async like(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.recipesService.like(id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const fileName = file.originalname;
    
    return this.recipesService.uploadImage(id, fileName);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.recipesService.deleteById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Recipe) {
    return this.recipesService.update(id, body);
  }
}
