import { Exclude, Expose, Type } from 'class-transformer'
import { Status } from 'src/statuses/domain/status.domain'

export class User {
  @Expose()
  id?: string

  @Expose()
  email: string | null

  @Expose()
  password: string

  @Expose()
  @Type(() => Status)
  status?: Status
}
