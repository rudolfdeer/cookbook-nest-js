import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { Recipe } from 'lib/data-access/entities/recipe.entity';
import { RecipeComment } from 'lib/data-access/entities/recipeComment.entity';
import { RecipeService } from '../services/recipe.service';

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

  @Post()
  async create(@Body() body: Recipe) {
    return this.recipesService.create(body);
  }

  @Post(':id')
  async createComment(@Param('id') id: string, @Body() body: RecipeComment) {
    //userId
    return this.recipesService.createComment(id, 2, body)
  }

  @Post(':id/like')
  async like(@Param('id') id: string) {
    //userId
    return this.recipesService.like(id, 1);
  }

  @Post(':id/image')
  async uploadImage(@Param('id') id: string) {
    //
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.recipesService.deleteById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Recipe) {
    return this.recipesService.update(id, body);
  }
}
