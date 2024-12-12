import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { Session } from '../session/domain/session.domain'
import { Session as SessionEntity } from '@prisma/client'
import { SessionMapper } from './mapper/session.mapper'

@Injectable()
export class SessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Omit<Session, 'expiresAt' | 'createdAt'>,
  ): Promise<Session> {
    const persistenceEntity = await SessionMapper.toPersistence(data)
    const newEntity = await this.prismaService.session.create({
      data: persistenceEntity,
      include: { user: true },
    })
    return await SessionMapper.toDomain(newEntity)
  }

  async findById(
    data: Omit<Session, 'expiresAt' | 'createdAt' | 'hash' | 'userId'>,
  ): Promise<Session> {
    const entity = await this.prismaService.session.findFirst({
      include: { user: true },
      where: { id: data.id },
    })
    return entity ? await SessionMapper.toDomain(entity) : null
  }
}
