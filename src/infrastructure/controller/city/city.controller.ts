import { Controller, Get } from '@nestjs/common';
import { CityService } from 'domain/service/city/city.entity';
import { CityEntity } from 'domain/model/city/city.entity';

@Controller("/cities")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  listAll(): Promise<CityEntity[]> {
    return this.cityService.listAll();
  }
}
