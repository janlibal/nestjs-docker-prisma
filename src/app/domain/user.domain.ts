import { Exclude, Expose, Type } from 'class-transformer'

export class User {
  @Expose()
  id?: string

  @Expose()
  email: string | null

  @Expose()
  password: string

  @Expose()
  statusId: number
}
