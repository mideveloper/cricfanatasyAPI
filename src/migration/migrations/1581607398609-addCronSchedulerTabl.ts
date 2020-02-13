import {MigrationInterface, QueryRunner} from "typeorm";

export class addCronSchedulerTabl1581607398609 implements MigrationInterface {
    name = 'addCronSchedulerTabl1581607398609'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "cron_scheduler" ("id" SERIAL NOT NULL, "last_fetch_date" TIMESTAMP NOT NULL, "message" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_314f11dfff8b6accfb8cd3834b1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ALTER COLUMN "category_id" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ALTER COLUMN "category_id" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`DROP TABLE "cron_scheduler"`, undefined);
    }

}
