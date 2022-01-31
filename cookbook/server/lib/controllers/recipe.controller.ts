import { Controller, Get, Post, Delete, Put, Param } from '@nestjs/common';
import { RecipeService } from '../services/recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipesService: RecipeService) {}

  @Get()
  findAll() {
    //
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    //
  }

  @Post()
  async create() {
    //
  }

  @Post(':id')
  async createComment(@Param('id') id: string) {
    //
  }

  @Post(':id/like')
  async like(@Param('id') id: string) {
    //
  }

  @Post(':id/image')
  async uploadImage(@Param('id') id: string) {
    //
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    //
  }

  @Put(':id')
  async update(@Param('id') id: string) {
    //
  }
}
