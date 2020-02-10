import * as pino from 'pino';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Formation } from '../entity/formation';

const logger = pino();

@Service()
export class FormationRepository {
  constructor(@InjectRepository(Formation) private repository: Repository<Formation>) {}

  public getAllFormation(): Promise<Formation[]> {
    return this.repository.find();
  }

  public getFormationById(id: number): Promise<Formation> {
    return this.repository.findOne({ where: { id } });
  }
}
