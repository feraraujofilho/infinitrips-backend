import { EntityRepository, Repository } from 'typeorm'
import { CityEntity } from 'domain/model/city/city.entity'

@EntityRepository(CityEntity)
export class CityRepository extends Repository<CityEntity> {
  findOneById(fareId: number): Promise<CityEntity> {
    return this.findOne({ where: { id: fareId } })
  }

  find(): any {
      return this.find()
  }
}
