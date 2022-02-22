import {getConnection, MigrationInterface, QueryRunner} from "typeorm";
import { CookbookComment } from '../entities/cookbookComment.entity';
import cookbookCommentSeed from '../seeds/cookbookComment.seed';

export class createCookbookComment1643805701801 implements MigrationInterface {

    public async up(): Promise<void> {
        await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CookbookComment)
      .values(cookbookCommentSeed)
      .execute();
  }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Cookbook_Comment');
    }

}
