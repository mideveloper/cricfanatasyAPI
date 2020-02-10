import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableLeagueTeamRemoveNotNullOnDeletedAt1579762810695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "league_team" ALTER COLUMN "deleted_at" DROP NOT NULL`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "league_team" ALTER COLUMN "deleted_at" DROP NOT NULL`, undefined);
  }
}
