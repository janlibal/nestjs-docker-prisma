import { Injectable } from '@nestjs/common'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'
import { User } from './domain/user.domain'
import { AppRepository } from './app.repository'
import * as pkginfo from '../../package.json'
import { Session as SessionEntity } from '@prisma/client'
import { SessionService } from '../session/session.service'
import { Session } from '../session/domain/session.domain'
import { AppResponseDto } from './dto/app.response.dto'

@Injectable()
export class AppService {
  constructor(
    private sessionService: SessionService,
    private appRepository: AppRepository,
  ) {}

  private users = []

  createUser(name: 'Jan', email: 'Libal') {
    const user = { id: this.users.length + 1, name, email }
    this.users.push(user)
    return user
  }

  findAll() {
    return this.users
  }

  findById(id: number) {
    return this.users.find((user) => user.id === id)
  }

  async validateLogin(creteUserDto: AuthEmailLoginDto): Promise<User> {
    const hash = 'HASH!!!!!'

    const clonedPayload = {
      password: creteUserDto.password,
      email: creteUserDto.email,
      status: { id: 1 },
    }
    const user = await this.appRepository.saveAndLogin(clonedPayload)
    const userId = user.id
    const session = await this.sessionService.create({ userId, hash })
    return user
  }

  async getSession(
    data: Omit<Session, 'expiresAt' | 'createdAt' | 'hash' | 'userId'>,
  ): Promise<Session> {
    const session = await this.sessionService.retrieve(data)
    return session
  }

  public async compileData(): Promise<AppResponseDto> {
    const env = await this.appRepository.getEnv()
    const data = {
      name: pkginfo.name,
      version: pkginfo.version,
      description: pkginfo.description,
      env,
    }
    return data
  }
}
