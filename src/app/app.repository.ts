import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { AppMapper } from './mappers/app.mapper'
import { User } from './domain/user.domain'
import { User as UserEntity } from '@prisma/client'
import { EnvDto } from './dto/env.dto'
import * as os from 'os'

@Injectable()
export class AppRepository {
  constructor(private prisma: PrismaService) {}
  async saveAndLogin(data: User): Promise<User> {
    const persistenceModel = await AppMapper.toPersistence(data)
    const newEntity = await this.prisma.user.create({ data: persistenceModel })
    return await AppMapper.toDomain(newEntity)
  }

  async simpleSave(data: User): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        password: data.password,
        email: data.email,
        statusId: data.status.id,
      },
    })
  }

  public async getEnv(): Promise<EnvDto> {
    const environments = {
      nodeVersion: process.versions['node'],
      hostName: os.hostname(),
      platform: `${process.platform}/${process.arch}`,
    }
    return environments
  }
}
