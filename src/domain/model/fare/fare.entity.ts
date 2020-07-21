import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('fare')
export class FareEntity {
  @PrimaryGeneratedColumn()
  'id': number

  @Column()
  'origin': string

  @Column()
  'destination': string

  @Column()
  'month': string

  @Column()
  'day': string

  @Column()
  'price': number
}
