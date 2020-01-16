import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

export class updatePlayersCategory1579089206432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const playerCategory = {
            '1': [
                13533,
                11992,
                15390,
                13460,
                13100,
                13075,
                13099,
                13071,
                11252,
                15393,
                14142,
                13050,
                13079,
                13558,
                13735,
                13538,
                13089,
                11245
            ],
            '2': [
                12585,
                15633,
                15386,
                13093,
                13493,
                11643,
                13098,
                11246,
                13731,
                15827,
                13540,
                14181,
                13049,
                16009,
                13046,
                18893,
                13030,
                11220
            ],
            '3': [
                12594,
                14186,
                15387,
                13074,
                13495,
                18852,
                13727,
                15397,
                13732,
                15908,
                18760,
                11234,
                15819,
                12285,
                13464,
                11253,
                13085,
                13065
            ],
            '4': [
                18690,
                17306,
                15970,
                13734,
                15388,
                15457,
                14137,
                23724,
                13068,
                18761,
                13729,
                15916,
                20521,
                14233,
                15779,
                14145,
                23727,
                13217,
                15877,
                13055,
                15512,
                13077,
                13088,
                13543,
                19022,
                13091,
                15402,
                15924,
                15403,
                15795
            ],
            '5': [
                19300,
                23725,
                13015,
                19010,
                18832,
                13026,
                23726,
                22675,
                22687,
                15902,
                18786
            ],
            '6': [
                17368,
                15408,
                13067,
                15809,
                14179,
                11211,
                12292,
                20527,
                15487,
                19013,
                12005,
                13094
            ]
        };

        const keys = Object.keys(playerCategory);
        for (let i = 0; i < keys.length; i++) {
            await getRepository('team_player')
                .createQueryBuilder('team_player')
                .update()
                .set({
                    category_id: keys[i]
                })
                .where('player_id IN (:...ids)', { ids: playerCategory[keys[i]] })
                .execute();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
