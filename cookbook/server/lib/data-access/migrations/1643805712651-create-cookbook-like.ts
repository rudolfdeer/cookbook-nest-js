import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { CookbookLike } from '../entities/cookbookLike.entity';
import cookbookLikeSeed from '../seeds/cookbookLike.seed';

export class createCookbookLike1643805712651 implements MigrationInterface {
  public async up(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CookbookLike)
      .values(cookbookLikeSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Cookbook_Like');
  }
}
