import { Injectable } from '@nestjs/common'
import { Session } from './domain/session.domain'
import { SessionRepository } from './session.repository'
import { Session as SessionEntity } from '@prisma/client'

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}
  create(data: Omit<Session, 'expiresAt' | 'createdAt'>): Promise<Session> {
    return this.sessionRepository.create(data)
  }

  retrieve(
    data: Omit<Session, 'expiresAt' | 'createdAt' | 'hash' | 'userId'>,
  ): Promise<Session> {
    return this.sessionRepository.findById(data)
  }
}
