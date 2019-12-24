import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { League } from "../seeds/league.seed";

export class seedLeague1577187527570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const leagues = League;
        await getRepository('league').save(leagues);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
