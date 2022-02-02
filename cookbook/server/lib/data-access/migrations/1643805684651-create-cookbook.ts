import {getConnection, MigrationInterface, QueryRunner} from "typeorm";
import { Cookbook } from '../entities/cookbook.entity';
import cookbookSeed from '../seeds/cookbook.seed';

export class createCookbook1643805684651 implements MigrationInterface {

  public async up(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Cookbook)
      .values(cookbookSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Cookbook');
  }
}
