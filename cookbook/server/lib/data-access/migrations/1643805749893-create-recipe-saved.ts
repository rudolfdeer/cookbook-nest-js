import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { RecipeSaved } from '../entities/recipeSaved.entity';
import recipeSavedSeed from '../seeds/recipeSaved.seed';

export class createRecipeSaved1643805749893 implements MigrationInterface {
  public async up(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(RecipeSaved)
      .values(recipeSavedSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Recipe_Saved');
  }
}
