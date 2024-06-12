import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { CookbookSaved } from '../entities/cookbookSaved.entity';
import cookbookSavedSeed from '../seeds/cookbookSaved.seed';

export class createCookbookSaved1643805721412 implements MigrationInterface {
  public async up(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CookbookSaved)
      .values(cookbookSavedSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Cookbook_Saved');
  }
}
