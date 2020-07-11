import { Module } from '@nestjs/common';
import { AppController } from '../../controller/app/app.controller';
import { AppService } from '../../../domain/service/app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { FareModule } from 'infrastructure/module/fare/fare.module';
import { FareEntity } from 'domain/model/fare/fare.entity';
import { CityModule } from 'infrastructure/module/city/city.module';
import { CityEntity } from 'domain/model/city/city.entity';


require('dotenv-flow').config()

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_URL,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_URL_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [FareEntity, CityEntity],
    synchronize: false,
  }), FareModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
