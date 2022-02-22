import {MigrationInterface, QueryRunner} from "typeorm";

export class createDb1643801905640 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase('cookbook_nest', true)
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropDatabase('cookbook_nest')
  }
}
