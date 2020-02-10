import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableLeagueTeamChangedTypeOfRemainingBudget1581075801243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "league_team" ALTER COLUMN "remaining_budget" SET DATA TYPE float`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "league_team" ALTER COLUMN "remaining_budget" SET DATA TYPE int`);
  }
}
