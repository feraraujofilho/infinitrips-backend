import { CityRepository } from './../../../infrastructure/repository/city/city.repository';
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CityEntity } from 'domain/model/city/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) {}

  async listAll(): Promise<CityEntity[]> {
    return this.cityRepository.find()
  }
}
