import { Service } from 'typedi';
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CronScheduler } from '../entity/cron_scheduler';

@Service()
export class CronSchedulerRepository {

    constructor(@InjectRepository(CronScheduler) private repository: Repository<CronScheduler>) {
    }

    public getLastFetch(): Promise<CronScheduler[]> {
        return this.repository.find({ order: { last_fetch_date: 'DESC' } });
    }

    public saveLastFetchDate(payload: {date: Date, message: string}): Promise<CronScheduler> {
        let cs = new CronScheduler();
        cs.last_fetch_date = payload.date;
        cs.message = payload.message;
        return this.repository.save(cs);
    }
}
