import { Service } from 'typedi';
import { CronSchedulerRepository } from '../repository/cron_scheduler';
import { CronScheduler } from '../entity/cron_scheduler';

@Service()
export class CronSchedulerService {
    constructor(private repo: CronSchedulerRepository) { }

    public async getLastFetch(): Promise<CronScheduler> {
        const res = await this.repo.getLastFetch();
        if (!res || !res.length) {
            return null;
        }
        return res[0];
    }

    public async saveLastFetchDate(payload: { date: Date, message: string }): Promise<CronScheduler> {
        return await this.repo.saveLastFetchDate(payload);
    }
}
