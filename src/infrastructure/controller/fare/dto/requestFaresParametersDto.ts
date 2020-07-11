import { IsOptional } from 'class-validator'

export class RequestFaresParametersDto {
  readonly origin: string

  readonly destination1: string

  @IsOptional()
  readonly destination2: string

  @IsOptional()
  readonly destination3: string

  @IsOptional()
  readonly destination4: string

  readonly nights: number
}