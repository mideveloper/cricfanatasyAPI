import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { PlayerCategories } from "../seeds/players_category";

export class seedCategory1579081494871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const pc = PlayerCategories;
        await getRepository('players_category').save(pc);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
