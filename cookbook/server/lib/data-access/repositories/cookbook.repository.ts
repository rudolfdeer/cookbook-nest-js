import { getRepository } from 'typeorm';
import { Cookbook } from '../entities/cookbook.entity';

const Repository = getRepository(Cookbook);

const findAll = async () => {
  const cookbooks = Repository.find();
  return cookbooks;
};

const cookbookRepository = {
  findAll,
};

module.exports = {
  cookbookRepository,
};
