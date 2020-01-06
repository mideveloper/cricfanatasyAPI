import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { League } from "../seeds/league.seed";

export class seedPSLLeague20201578306211629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const leagues = League[1];
        await getRepository('league').save([leagues]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
