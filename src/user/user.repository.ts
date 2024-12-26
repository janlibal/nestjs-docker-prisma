import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { User as UserEntity } from '@prisma/client'
import { User } from '../app/domain/user.domain'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async simpleSave(data: User): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        password: data.password,
        email: data.email,
        statusId: data.status.id,
      },
    })
  }
}
