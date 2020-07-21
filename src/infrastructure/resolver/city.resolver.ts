import { CityService } from './../../domain/service/city/city.service';
import { CityEntity } from './../../domain/model/city/city.entity';

import { Query, Resolver, Args } from '@nestjs/graphql'

// http://localhost:3000/graphql playground can be used to test the resolver

@Resolver('city')
export class CityResolver {
    constructor(private cityService: CityService) { }

    @Query()
    cities(): Promise<CityEntity[]> {
        return this.cityService.listAll()
    }

    @Query()
    originAndDestinations(@Args("origin") origin: string, @Args("destination1") destination1: string, @Args("destination2") destination2: string, @Args("destination3") destination3: string, @Args("destination4") destination4: string): Promise<CityEntity[]> {
        return this.cityService.find(origin, destination1, destination2, destination3, destination4)
    }
}