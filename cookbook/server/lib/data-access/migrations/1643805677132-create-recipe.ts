import {getConnection, MigrationInterface, QueryRunner} from "typeorm";
import { Recipe } from '../entities/recipe.entity';
import recipeSeed from '../seeds/recipe.seed';

export class createRecipe1643805677132 implements MigrationInterface {

  public async up(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Recipe)
      .values(recipeSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Recipe');
  }
}
