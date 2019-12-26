import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { MatchSchedule } from "../seeds/match.seed";

export class seedMatch1577189707605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const matches = MatchSchedule;
        let matchDTO: any = [];
        for (let i = 0; i < matches.length; i++) {
            const m = matches[i];
            let dto: any = {
                match_id: m.mid,
                league_id: 1,
                title: m.t1t + ' vs ' + m.t2t,
                team_1: m.t1t,
                team_2: m.t2t,
                play_date: new Date(m.md),
                play_time: m.mti,
                match_result: m.mr,
                match_overs: 20,
                team_1_score: m.t1s,
                team_1_overs: m.t1o,
                team_2_score: m.t2s,
                team_2_overs: m.t2o,
                stadium: m.mVnu.t,
                city: m.mVnu.ci,
                country: m.mVnu.co
            };
            matchDTO.push(dto);
        }

        await getRepository('match').save(matchDTO);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
