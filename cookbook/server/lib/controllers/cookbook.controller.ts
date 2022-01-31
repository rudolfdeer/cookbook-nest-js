import { Controller, Get, Post, Delete, Put, Param } from '@nestjs/common';
import { CookbookService } from '../services/cookbook.service';

@Controller('cookbooks')
export class CookbookController {
  constructor(private readonly cookbooksService: CookbookService) {}

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
