import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn()
  'id': number

  @Column()
  'name': string

  @Column()
  'abb': string
}
