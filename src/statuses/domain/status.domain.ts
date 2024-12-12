import { Expose } from 'class-transformer'
import { Allow } from 'class-validator'

export class Status {
  @Allow()
  @Expose()
  id: number

  @Allow()
  @Expose()
  title?: string
}
