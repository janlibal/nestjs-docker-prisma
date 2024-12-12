import { Injectable } from '@nestjs/common'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'
import { LoginResponseDto } from './dto/login.response.dto'
import { PrismaService } from '../database/prisma.service'
import { AppMapper } from './mappers/app.mapper'
import { User } from './domain/user.domain'

@Injectable()
export class AppRepository {
  constructor(private prisma: PrismaService) {}
  async saveAndLogin(data: User): Promise<User> {
    const persistenceModel = await AppMapper.toPersistence(data)
    const newEntity = await this.prisma.user.create({ data: persistenceModel })
    return await AppMapper.toDomain(newEntity)
  }
}
