import { MigrationInterface, QueryRunner } from "typeorm";

export class initTables1576868400000 implements MigrationInterface {
    name = 'initTables1576868400000'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE player_type_enum AS ENUM ('1', '2', '3', '4');`)
        await queryRunner.query(`CREATE TABLE "user" ("user_id" integer NOT NULL, "first_name" character varying, "last_name" character varying, "user_name" character varying, "profile_picture" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "access_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_4bd9bc00776919370526766eb4" UNIQUE ("user_id"), CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "example" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "formation" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "total_player" integer NOT NULL, "batsman" integer NOT NULL, "bowler" integer NOT NULL, "all_rounder" integer NOT NULL, "wicket_keeper" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b7ed8d0239c80921e788650b0d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "league_team" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "budget" integer NOT NULL, "formation_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_814bf8fc899e0b812d811d3d2ea" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "player_id" integer NOT NULL, "full_name" character varying(200) NOT NULL, "name" character varying(200) NOT NULL, "type" "player_type_enum" NOT NULL DEFAULT '4', "skills" character varying, "dob" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "league" ("id" SERIAL NOT NULL, "full_name" character varying(200) NOT NULL, "name" character varying(200) NOT NULL, "budget" integer NOT NULL, "start_date" date, "end_date" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0bd74b698f9e28875df738f7864" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "match_id" integer NOT NULL, "league_id" integer NOT NULL, "title" character varying NOT NULL, "team_1" character varying NOT NULL, "team_2" character varying NOT NULL, "play_date" TIMESTAMP NOT NULL, "play_time" character varying NOT NULL, "match_result" character varying, "match_overs" integer NOT NULL, "team_1_score" character varying, "team_1_overs" character varying, "team_2_score" character varying, "team_2_overs" character varying, "stadium" character varying, "city" character varying, "country" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_stats_fetch" bit DEFAULT '0', CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "league_team_player" ("id" SERIAL NOT NULL, "league_team_id" integer NOT NULL, "player_id" integer NOT NULL, "points" integer NOT NULL, "match_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3264f0d28197f6b042d25456f4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "match_stats" ("id" SERIAL NOT NULL, "match_id" integer NOT NULL, "player_id" integer NOT NULL, "sixes" integer NOT NULL DEFAULT 0, "fours" integer NOT NULL DEFAULT 0, "hat_tricks" integer NOT NULL DEFAULT 0, "catches" integer NOT NULL DEFAULT 0, "economy_rate" numeric NOT NULL DEFAULT 0, "wickets" integer NOT NULL DEFAULT 0, "strike_rate" numeric NOT NULL DEFAULT 0, "runs" integer NOT NULL DEFAULT 0, "run_outs" integer NOT NULL DEFAULT 0, "ball_faced" integer NOT NULL DEFAULT 0, "over_placed" character varying(50) NOT NULL, "run_conceded" integer NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c773744b8dae4efbbf72d4b486c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "players_category" ("id" SERIAL NOT NULL, "league_id" integer NOT NULL, "name" character varying(200) NOT NULL, "worth" numeric NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0c4a50ef4b3b51d6716f651f7da" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "team_player" ("id" SERIAL NOT NULL, "league_id" integer NOT NULL, "team_id" integer NOT NULL, "player_id" integer NOT NULL, "category_id" integer DEFAULT null, "is_active" bit DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e0e94c07a2898080511249550b6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "league_id" integer NOT NULL, "name" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "access_token" ADD CONSTRAINT "FK_4bd9bc00776919370526766eb43" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" ADD CONSTRAINT "FK_f8a6daeaece063c75312f334d0d" FOREIGN KEY ("formation_id") REFERENCES "formation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_5243e7f168b381cf979cd039ec9" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" ADD CONSTRAINT "FK_aa99cff4f127bd108077ec3028a" FOREIGN KEY ("league_team_id") REFERENCES "league_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" ADD CONSTRAINT "FK_74f7d5159c821fb9fd43ac95b38" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" ADD CONSTRAINT "FK_2f0cd4d748092978341b5f9a9ab" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "match_stats" ADD CONSTRAINT "FK_158a174fe7d42d7b07bd3f71583" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "players_category" ADD CONSTRAINT "FK_d4e7365a1ebbf2b53ca2afdb3a0" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f" FOREIGN KEY ("category_id") REFERENCES "players_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_61d5f175df34e436f88cb7f2859" FOREIGN KEY ("league_id") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_61d5f175df34e436f88cb7f2859"`, undefined);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_d6322302be543bb8c9fb76d6d6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "players_category" DROP CONSTRAINT "FK_d4e7365a1ebbf2b53ca2afdb3a0"`, undefined);
        await queryRunner.query(`ALTER TABLE "match_stats" DROP CONSTRAINT "FK_158a174fe7d42d7b07bd3f71583"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" DROP CONSTRAINT "FK_2f0cd4d748092978341b5f9a9ab"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" DROP CONSTRAINT "FK_74f7d5159c821fb9fd43ac95b38"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team_player" DROP CONSTRAINT "FK_aa99cff4f127bd108077ec3028a"`, undefined);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_5243e7f168b381cf979cd039ec9"`, undefined);
        await queryRunner.query(`ALTER TABLE "league_team" DROP CONSTRAINT "FK_f8a6daeaece063c75312f334d0d"`, undefined);
        await queryRunner.query(`ALTER TABLE "access_token" DROP CONSTRAINT "FK_4bd9bc00776919370526766eb43"`, undefined);
        await queryRunner.query(`DROP TABLE "team"`, undefined);
        await queryRunner.query(`DROP TABLE "team_player"`, undefined);
        await queryRunner.query(`DROP TABLE "players_category"`, undefined);
        await queryRunner.query(`DROP TABLE "match_stats"`, undefined);
        await queryRunner.query(`DROP TABLE "league_team_player"`, undefined);
        await queryRunner.query(`DROP TABLE "match"`, undefined);
        await queryRunner.query(`DROP TABLE "league"`, undefined);
        await queryRunner.query(`DROP TABLE "player"`, undefined);
        await queryRunner.query(`DROP TABLE "league_team"`, undefined);
        await queryRunner.query(`DROP TABLE "formation"`, undefined);
        await queryRunner.query(`DROP TABLE "example"`, undefined);
        await queryRunner.query(`DROP TABLE "access_token"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
