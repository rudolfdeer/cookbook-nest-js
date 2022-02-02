import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey, getRepository, getConnection } from "typeorm";
import userSeed from '../seeds/user.seed';
import {User} from "../entities/user.entity";

export class createUser1643795893796 implements MigrationInterface {

  public async up(): Promise<void> {

    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(userSeed)
    .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User');
  }

}
