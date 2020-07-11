import { EntityRepository, Repository } from 'typeorm'
import { FareEntity } from 'domain/model/fare/fare.entity'

@EntityRepository(FareEntity)
export class FareRepository extends Repository<FareEntity> {
  findOneById(fareId: number): Promise<FareEntity> {
    return this.findOne({ where: { id: fareId } })
  }
}
