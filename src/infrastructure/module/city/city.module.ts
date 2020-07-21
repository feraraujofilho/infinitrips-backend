import { CityResolver } from './../../resolver/city.resolver';
import { CityService } from '../../../domain/service/city/city.service';
import { CityRepository } from './../../repository/city/city.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common'
import { CityEntity } from 'domain/model/city/city.entity';
import { CityController } from 'infrastructure/controller/city/city.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity, CityRepository])],
  controllers: [CityController],
  providers: [CityService, CityEntity, CityResolver],
  exports: [],
})
export class CityModule { }
