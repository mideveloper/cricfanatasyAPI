import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Formation } from "../seeds/formation.seed";

export class seedFormations1577193086761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const formations = Formation;
        await getRepository('formation').save(formations);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
