import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Teams } from "../seeds/teams.seed";

export class seedTeam1577192317746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const teams = Teams;
        await getRepository('team').save(teams);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
