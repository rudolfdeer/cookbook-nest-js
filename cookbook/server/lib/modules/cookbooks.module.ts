import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { CookbooksController } from '../controllers/cookbooks.controller';
import { CookbooksService } from '../services/cookbooks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cookbook])],
  controllers: [CookbooksController],
  providers: [CookbooksService],
  exports: [CookbooksModule],
})
export class CookbooksModule {}
