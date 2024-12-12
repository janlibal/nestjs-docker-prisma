import { Injectable } from '@nestjs/common'
import { AuthEmailLoginDto } from 'src/app/dto/auth.email.login.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  create(createUserDto: AuthEmailLoginDto) {
    return this.userRepository.save(createUserDto)
  }
}
