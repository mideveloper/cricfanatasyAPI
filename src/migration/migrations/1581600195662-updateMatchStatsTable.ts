import {MigrationInterface, QueryRunner} from "typeorm";

export class updateMatchStatsTable1581600195662 implements MigrationInterface {
    name = 'updateMatchStatsTable1581600195662'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "match_stats" ADD "league_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "match_stats" ADD "points" integer DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ALTER COLUMN "category_id" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "match_stats" ADD CONSTRAINT "FK_e39ea69ab2dc88565cd1f84548d" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "match_stats" DROP CONSTRAINT "FK_e39ea69ab2dc88565cd1f84548d"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ALTER COLUMN "category_id" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "match_stats" DROP COLUMN "points"`, undefined);
        await queryRunner.query(`ALTER TABLE "match_stats" DROP COLUMN "league_id"`, undefined);
    }

}
