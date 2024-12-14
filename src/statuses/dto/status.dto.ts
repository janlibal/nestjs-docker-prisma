import { IsNumber } from 'class-validator'
import { Status } from '../domain/status.domain'

export class StatusDto implements Status {
  @IsNumber()
  id: number
}
