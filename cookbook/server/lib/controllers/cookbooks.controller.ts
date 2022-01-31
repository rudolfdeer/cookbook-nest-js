import { Controller, Get, Post, Delete, Put, Param } from '@nestjs/common';
import { CookbooksService } from '../services/cookbooks.service';

@Controller('cookbooks')
export class CookbooksController {
  constructor(private readonly cookbooksService: CookbooksService) {}

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
