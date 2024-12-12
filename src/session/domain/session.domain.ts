import { User } from 'src/app/domain/user.domain'

export class Session {
  id?: number
  //user: User
  userId: string
  hash: string
  createdAt: Date
  expiresAt: Date
}
