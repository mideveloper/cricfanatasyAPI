import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserIdInLeaguePlayer1579619779331 implements MigrationInterface {
    name = 'addUserIdInLeaguePlayer1579619779331'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "league_team" ADD "user_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ALTER COLUMN "category_id" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" ADD CONSTRAINT "FK_ad4016d89f6513462785fc0e4aa" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP CONSTRAINT "FK_ad4016d89f6513462785fc0e4aa"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ALTER COLUMN "category_id" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP COLUMN "user_id"`, undefined);
    }

}
