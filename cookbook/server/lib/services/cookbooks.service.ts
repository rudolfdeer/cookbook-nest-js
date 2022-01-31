import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CookbooksService {
  constructor(
    @InjectRepository(Cookbook)
    private cookbooksRepository: Repository<Cookbook>,
  ) {}

  findAll() {
    //
  }
}
