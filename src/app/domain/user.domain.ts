import { Exclude, Expose, Type } from 'class-transformer'

export class User {
  @Expose()
  id?: string

  @Expose()
  email: string | null

  @Exclude({ toPlainOnly: true })
  password: string

}
