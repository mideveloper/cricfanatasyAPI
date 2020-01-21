import {MigrationInterface, QueryRunner} from "typeorm";

export class updateLeagueTeamPlayerSchema1579619211256 implements MigrationInterface {
    name = 'updateLeagueTeamPlayerSchema1579619211256'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "league_team_player" DROP CONSTRAINT "FK_2f0cd4d748092978341b5f9a9ab"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" RENAME COLUMN "match_id" TO "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP COLUMN "budget"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" ADD "league_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" ADD "total_budget" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" ADD "remaining_budget" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" ADD "deleted_at" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "UQ_3604cfdbf6a3c85fa5aa2edeae8" UNIQUE ("player_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" ADD "deleted_at" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ALTER COLUMN "category_id" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" ADD CONSTRAINT "FK_d3899fe533b2a6e75006a0859c7" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_a6f4fcfc1c7229fbcb67c6fb4b2" FOREIGN KEY ("player_id") REFERENCES "player"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_ac195c6f3ba8962bd9f11cc400d" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_ac195c6f3ba8962bd9f11cc400d"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_a6f4fcfc1c7229fbcb67c6fb4b2"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP CONSTRAINT "FK_d3899fe533b2a6e75006a0859c7"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ALTER COLUMN "category_id" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" ADD "deleted_at" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "UQ_3604cfdbf6a3c85fa5aa2edeae8"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP COLUMN "remaining_budget"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP COLUMN "total_budget"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP COLUMN "league_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" ADD "budget" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" RENAME COLUMN "deleted_at" TO "match_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" ADD CONSTRAINT "FK_2f0cd4d748092978341b5f9a9ab" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
