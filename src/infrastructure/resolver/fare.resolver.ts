import { FareEntity } from 'domain/model/fare/fare.entity';
import { FareService } from 'domain/service/fare/fare.service';
/* function addDays(myDate,days) {
    return new Date(myDate.getTime() + days*24*60*60*1000);
    }
    
const formatDate = (date) => {
    // eslint-disable-next-line prefer-const
    let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
    
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    return [year, month, day].join('-');
}
    
const filterFlights = (data, nights) => {
    
    return data.reduce((acc, value) => {
        const returnflight = data.find(flight => flight.origin === value.destination && flight.destination === value.origin && flight.day === formatDate(addDays(new Date(value.day), nights)))
    
            if(returnflight){
                acc.push({
                origin: value.origin,
                destination: value.destination,
                date: value.day,
                price: Number(value.price) + Number(returnflight.price)
                }) 
            }
            return acc
        }, [])
} */

import { Query, Resolver, Args } from '@nestjs/graphql'

// http://localhost:3000/graphql playground can be used to test the resolver

@Resolver('fare')
export class FareResolver {
  constructor(private fareService: FareService) {}

  @Query()
  fares(@Args("origin") origin: string, @Args("destination1") destination1: string, @Args("destination2") destination2: string): Promise<FareEntity[]> {
    return this.fareService.getManyByMatch(origin, destination1, destination2)
  }
}

