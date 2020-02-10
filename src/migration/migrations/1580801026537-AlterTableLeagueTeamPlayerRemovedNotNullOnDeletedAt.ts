import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableLeagueTeamPlayerRemovedNotNullOnDeletedAt1580801026537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "league_team_player" ALTER COLUMN "deleted_at" DROP NOT NULL`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "league_team_player" ALTER COLUMN "deleted_at" DROP NOT NULL`, undefined);
  }
}
