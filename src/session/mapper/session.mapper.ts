import { Session as SessionEntity } from '@prisma/client'
import { Session } from '../domain/session.domain'

export type NestedOmit<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]: NestedOmit<
    T[P],
    K extends `${Exclude<P, symbol>}.${infer R}` ? R : never
  >
}

export class SessionMapper {
  static async toPersistence(
    data: Omit<Session, 'createdAt' | 'expiresAt'>,
  ): Promise<Omit<SessionEntity, 'expiresAt' | 'createdAt'>> {
    const persistenceEntity: Omit<SessionEntity, 'expiresAt' | 'createdAt'> = {
      id: data.id,
      hash: data.hash,
      userId: data.userId,
    }
    return persistenceEntity
  }

  static async toDomain(raw: SessionEntity): Promise<Session> {
    const domainEntity: SessionEntity = {
      id: raw.id,
      hash: raw.hash,
      expiresAt: raw.expiresAt,
      createdAt: raw.createdAt,
      userId: raw.userId,
      ...raw,
    }
    return domainEntity
  }
}
