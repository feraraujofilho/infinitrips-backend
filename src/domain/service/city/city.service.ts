import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CityEntity } from 'domain/model/city/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) { }

  async listAll(): Promise<CityEntity[]> {
    return this.cityRepository.find()
  }

  async find(origin: string, destination1: string, destination2?: string, destination3?: string, destination4?: string): Promise<CityEntity[]> {
    return this.cityRepository.find({ where: [{ name: origin }, { name: destination1 }, { name: destination2 }, { name: destination3 }, { name: destination4 }] })
  }
}
