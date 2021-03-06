import { Controller, Get, Post, Body } from '@nestjs/common'
import { FareService } from 'domain/service/fare/fare.service'
import { FareEntity } from 'domain/model/fare/fare.entity'
import { RequestFaresParametersDto } from 'infrastructure/controller/fare/dto/requestFaresParametersDto'

@Controller('flights')
// @UsePipes(
//     new ValidationPipe({
//       whitelist: true,
//     //   forbidNonWhitelisted: true,
//     }),
//     )
export class FareController {
  constructor(
    private fareService: FareService,
  ) { }

  @Get()
  async findAllFares(): Promise<FareEntity[]> {
    return this.fareService.listAll()
  }


  @Post()
  async findMatchedFares(@Body() requestFaresParametersDto: RequestFaresParametersDto): Promise<FareEntity[]> {
    return this.fareService.findManyFromRequest(requestFaresParametersDto)
  }
}
