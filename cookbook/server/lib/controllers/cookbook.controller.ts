import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { CookbookComment } from 'lib/data-access/entities/cookbookComment.entity';
import { RecipeComment } from 'lib/data-access/entities/recipeComment.entity';
import { CookbookService } from '../services/cookbook.service';

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

  @Post()
  async create(@Body() body: Cookbook) {
    return this.cookbooksService.create(body);
  }

  @Post(':id')
  async createComment(@Param('id') id: string, @Body() body: CookbookComment) {
    //userId
    return this.cookbooksService.createComment(id, 2, body)
  }

  @Post(':id/like')
  async like(@Param('id') id: string) {
    //userId
    return this.cookbooksService.like(id, 1)
  }

  @Post(':id/image')
  async uploadImage(@Param('id') id: string) {
    //
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.cookbooksService.deleteById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Cookbook) {
    return this.cookbooksService.update(id, body);
  }
}
