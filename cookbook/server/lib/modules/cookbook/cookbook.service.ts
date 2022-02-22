import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cookbook } from 'lib/data-access/entities/cookbook.entity';
import { CookbookComment } from 'lib/data-access/entities/cookbookComment.entity';
import { CookbookLike } from 'lib/data-access/entities/cookbookLike.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class CookbookService {
  constructor(
    @InjectRepository(Cookbook)
    private cookbookRepository: Repository<Cookbook>,
    @InjectRepository(CookbookLike)
    private cookbookLikeRepository: Repository<CookbookLike>,
    @InjectRepository(CookbookComment)
    private cookbookCommentRepository: Repository<CookbookComment>,
  ) {}

  async findAll(): Promise<Cookbook[]> {
    const cookbooks = await this.cookbookRepository.find();

    return cookbooks;
  }

  async findById(id: string): Promise<Cookbook> {
    const cookbook = await this.cookbookRepository.findOne(id)

    return cookbook;
  }

  async deleteById(id: string): Promise<void> {
    await this.cookbookRepository.delete(id)
  }

  async create(body: Cookbook, userId: number) {
    const newCookbook = {...body, userId}
    const cookbook = await this.cookbookRepository.save(newCookbook);
    const id = cookbook.id;

    const result = await this.cookbookRepository.findOne(id);

    return result;
  }

  async update(id: string, body: Cookbook) {
    await this.cookbookRepository.update(id, body);

    const cookbook = await this.cookbookRepository.findOne(id);

    return cookbook;
  }


  async like(id: string, userId: number) {
    const instance = await this.cookbookLikeRepository.find({where: {
      userId,
    }})

    if(instance) {
      this.cookbookLikeRepository.remove(instance);
    } else {
      const like = new CookbookLike();
      like.cookbookId = +id;
      like.userId = userId;
      await this.cookbookLikeRepository.save(like);
    }

    const cookbook = await this.cookbookRepository.findOne(id);
    return cookbook;
  }

  async createComment(id: string, userId: number, body: CookbookComment) {

    const instance = this.cookbookCommentRepository.create({
      userId,
      cookbookId: +id,
      date: body.date,
      text: body.text,
    });

    await this.cookbookCommentRepository.save(instance);

    const cookbook = await this.cookbookRepository.findOne(id);
    return cookbook;
  }

  async uploadImage(id: string, fileName: string) {

    await this.cookbookRepository.update(id, {
      image: fileName
    });

    const cookbook = await this.cookbookRepository.findOne(id);

    return cookbook;

  }
}
