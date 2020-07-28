/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FareRepository } from 'infrastructure/repository/fare/fare.repository'
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

const filterFlights = async (data: FareEntity[], origin: string, destinations: string[], nights: number): Promise<any[]> => {

  let departureDate = formatDate(new Date())
  let referenceStartDate = formatDate(new Date())

  let arr = []

  while (departureDate !== formatDate(addDays(new Date(referenceStartDate), 180))) {

    for (let i = 0; i < destinations.length; i++) {

      let departureFlight = data.filter(flight => (flight.origin === origin && flight.destination === destinations[i] && flight.day.includes(departureDate)))

      let returnFlight = data.filter(flight => (flight.origin === destinations[i] && flight.destination === origin && flight.day.includes(formatDate(addDays(new Date(departureDate), nights)))))

      if (departureFlight.length > 0 && returnFlight.length > 0) {
        const totalPrice = Number(departureFlight[0].price) + Number(returnFlight[0].price)

        const arrEl = arr.find(el => el.departuredate.includes(departureDate))

        if (arrEl) {
          arrEl[i] = totalPrice
        }
        if (!arrEl) {
          let departureDateInRightFormat = new Date(departureDate)

          let returnDate = formatDate(addDays(departureDateInRightFormat, nights))

          const returnDateInRightFormat = new Date(returnDate)

          arr.push({ departuredate: `${departureDateInRightFormat.toLocaleString('en-us', { weekday: 'long' })} - ${departureDate}`, returndate: `${returnDateInRightFormat.toLocaleString('en-us', { weekday: 'long' })} - ${returnDate}`, [i]: totalPrice })
        }
      }
    }

    departureDate = formatDate(addDays(new Date(departureDate), 1))
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

    const allFares = await this.fareRepository.find({
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

    return filterFlights(allFares, origin, [destination1, destination2, destination3, destination4], nights)
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
