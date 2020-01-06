import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { KK, LQ, MS, PZ, QG, IU } from "../seeds/team_squad_psl_20";

export class seedLeaguePlayerPSL20201578306391204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let playersDTO: any = [];

        const isPlayer = IU;
        const kkPlayer = KK;
        const lqPlayer = LQ;
        const msPlayer = MS;
        const pzPlayer = PZ;
        const qgPlayer = QG;

        for (let i = 0; i < isPlayer.length; i++) {
            const p = isPlayer[i];
            let dto: any = {};
            dto.player_id = p.Id;
            dto.league_id = 2;
            dto.worth = 1000000;
            dto.team_id = 1;
            playersDTO.push(dto);
        }

        for (let i = 0; i < kkPlayer.length; i++) {
            const p = kkPlayer[i];
            let dto: any = {};
            dto.player_id = p.Id;
            dto.league_id = 2;
            dto.worth = 1000000;
            dto.team_id = 6;
            playersDTO.push(dto);
        }

        for (let i = 0; i < lqPlayer.length; i++) {
            const p = lqPlayer[i];
            let dto: any = {};
            dto.player_id = p.Id;
            dto.league_id = 2;
            dto.worth = 1000000;
            dto.team_id = 4;
            playersDTO.push(dto);
        }

        for (let i = 0; i < msPlayer.length; i++) {
            const p = msPlayer[i];
            let dto: any = {};
            dto.player_id = p.Id;
            dto.league_id = 2;
            dto.worth = 1000000;
            dto.team_id = 2;
            playersDTO.push(dto);
        }

        for (let i = 0; i < pzPlayer.length; i++) {
            const p = pzPlayer[i];
            let dto: any = {};
            dto.player_id = p.Id;
            dto.league_id = 2;
            dto.worth = 1000000;
            dto.team_id = 3;
            playersDTO.push(dto);
        }

        for (let i = 0; i < qgPlayer.length; i++) {
            const p = qgPlayer[i];
            let dto: any = {};
            dto.player_id = p.Id;
            dto.league_id = 2;
            dto.worth = 1000000;
            dto.team_id = 5;
            dto.is_active = '1';
            playersDTO.push(dto);
        }

        await getRepository('team_player').save(playersDTO);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
