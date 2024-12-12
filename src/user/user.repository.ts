import { Injectable } from '@nestjs/common'
import { AuthEmailLoginDto } from 'src/app/dto/auth.email.login.dto'

@Injectable()
export class UserRepository {
  save(createUserDto: AuthEmailLoginDto) {
    const userObject = {
      email: createUserDto.email,
      password: createUserDto.password,
    }
    return userObject
  }
}
