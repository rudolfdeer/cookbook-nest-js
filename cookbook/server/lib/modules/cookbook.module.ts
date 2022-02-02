import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { CookbookController } from '../controllers/cookbook.controller';
import { CookbookService } from '../services/cookbook.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cookbook])],
  controllers: [CookbookController],
  providers: [CookbookService],
})
export class CookbookModule {}
