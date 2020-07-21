/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FareRepository } from 'infrastructure/repository/fare/Fare.repository'
import { FareEntity } from 'domain/model/fare/fare.entity'
import { RequestFaresParametersDto } from 'infrastructure/controller/fare/dto/requestFaresParametersDto'

function addDays(myDate, days) {
  return new Date(myDate.getTime() + days * 24 * 60 * 60 * 1000);
}

const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;

  return [year, month, day].join('-');
}

const filterFlights = async (data, origin, destinations, nights): Promise<any[]> => {

  let today = formatDate(new Date())
  const referenceStartDate = formatDate(new Date())

  const arr = []

  const filteredData = data.filter(value => destinations.includes(value.origin) || destinations.includes(value.destination))

  while (today !== formatDate(addDays(new Date(referenceStartDate), 180))) {
    for (let i = 0; i < destinations.length; i++) {
      const roundTrip = filteredData.filter(flight => (flight.origin === origin && flight.destination === destinations[i] && flight.day.includes(today)) || (flight.origin === destinations[i] && flight.destination === origin && flight.day.includes(formatDate(addDays(new Date(today), nights)))))
      if (roundTrip.length === 2) {

        const arrEl = arr.find(el => el.date.startsWith(today))
        if (arrEl) {
          arrEl[i] = Number(roundTrip[0].price) + Number(roundTrip[1].price)
        }
        else {
          arr.push({ date: `${today} - ${formatDate(addDays(new Date(today), nights))}`, [i]: Number(roundTrip[0].price) + Number(roundTrip[1].price) })
        }
      }

    }
    today = formatDate(addDays(new Date(today), 1))
  }

  return arr
}



@Injectable()
export class FareService {
  constructor(
    @InjectRepository(FareRepository)
    private fareRepository: FareRepository,
  ) { }

  async listAll(): Promise<FareEntity[]> {
    return this.fareRepository.find()
  }

  async findManyFromRequest(requestFaresParametersDto: RequestFaresParametersDto): Promise<any[]> {
    const { origin, destination1, destination2, destination3, destination4, nights } = requestFaresParametersDto

    const test = await this.fareRepository.find({
      where: [
        { origin, destination: destination1 },
        { origin: destination1, destination: origin },
        { origin, destination: destination2 },
        { origin: destination2, destination: origin },
        { origin, destination: destination3 },
        { origin: destination3, destination: origin },
        { origin, destination: destination4 },
        { origin: destination4, destination: origin }
      ]
    })

    return filterFlights(test, origin, [destination1, destination2, destination3, destination4], nights)
  }

  getManyByMatch(origin: string, destination1: string, destination2: string): Promise<FareEntity[]> {
    return this.fareRepository.find({
      where: [
        { origin, destination: destination1 },
        { origin: destination1, destination: origin },
        { origin, destination: destination2 },
        { origin: destination2, destination: origin }
      ]
    })
  }
}
