import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { RecipeLike } from '../entities/recipeLike.entity';
import recipeLikeSeed from '../seeds/recipeLike.seed';

export class createRecipeLike1643805742900 implements MigrationInterface {
  public async up(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(RecipeLike)
      .values(recipeLikeSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Recipe_Like');
  }
}
