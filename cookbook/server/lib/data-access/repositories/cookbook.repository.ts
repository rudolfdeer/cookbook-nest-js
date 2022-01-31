import { getRepository } from 'typeorm';
import { Cookbook } from '../entities/cookbook.entity';

const cookbookRepository = getRepository(Cookbook);
