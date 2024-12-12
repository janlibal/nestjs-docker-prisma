import { Type } from 'class-transformer'
import { User } from '../domain/user.domain'

export class LoginResponseDto {
  id: string
  email: string
  password: string
}
