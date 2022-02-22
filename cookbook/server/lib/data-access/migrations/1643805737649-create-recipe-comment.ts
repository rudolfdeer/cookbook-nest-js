import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { RecipeComment } from '../entities/recipeComment.entity';
import recipeCommentSeed from '../seeds/recipeComment.seed';

export class createRecipeComment1643805737649 implements MigrationInterface {
  public async up(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(RecipeComment)
      .values(recipeCommentSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Recipe_Comment');
  }
}
