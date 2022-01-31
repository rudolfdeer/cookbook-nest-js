import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CookbookService {
  constructor(
    @InjectRepository(Cookbook)
    private cookbookRepository: Repository<Cookbook>,
  ) {}

  findAll() {
    //
  }
}
