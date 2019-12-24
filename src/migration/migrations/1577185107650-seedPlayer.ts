import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Players } from "../seeds/players.seed";
import { player_type } from "../../util/enums";

export class seedPlayer1577185107650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const players = Players;
        let playersDTO: any = [];
        for (let i = 0; i < players.length; i++) {
            const p = players[i];
            const pType = p.d.replace(' ', '_');
            let dto: any = {};
            dto.player_id = p.Id;
            dto.name = p.n;
            dto.full_name = p.fn;
            dto.type = player_type[pType];
            dto.skills = p.bs;
            playersDTO.push(dto);
        }

        await getRepository('player').save(playersDTO);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
