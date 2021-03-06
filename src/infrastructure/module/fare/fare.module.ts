import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common'
import { FareEntity } from 'domain/model/fare/fare.entity';
import { FareService } from 'domain/service/fare/fare.service';
import { FareController } from 'infrastructure/controller/fare/fare.controller';
import { FareResolver } from 'infrastructure/resolver/fare.resolver';
import { FareRepository } from 'infrastructure/repository/fare/fare.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FareEntity, FareRepository])],
  controllers: [FareController],
  providers: [FareService, FareResolver],
  exports: [],
})
export class FareModule { }
