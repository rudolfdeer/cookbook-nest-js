import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { RecipeCookbook } from '../entities/recipeCookbook.entity';
import recipeCookbookSeed from '../seeds/recipeCookbook.seed';

export class createRecipeCookbook1643805729259 implements MigrationInterface {
  public async up(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(RecipeCookbook)
      .values(recipeCookbookSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Recipe_Cookbook');
  }
}
