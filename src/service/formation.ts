import * as pino from "pino";
import { Service } from "typedi";
import { FormationRepository } from "../repository/formation";
import { Formation } from "../entity/formation";

@Service()
export class FormationService {
  constructor(private repo: FormationRepository) {}

  public getAllFormation(): Promise<Formation[]> {
    return this.repo.getAllFormation();
  }
}
