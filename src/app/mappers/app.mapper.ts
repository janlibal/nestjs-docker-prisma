import { User as UserEntity } from '@prisma/client'
import { User } from '../domain/user.domain'

export class AppMapper {
  static async toPersistence(data: User): Promise<Omit<UserEntity, 'id'>> {
    const persistenceEntity: Omit<UserEntity, 'id'> = {
      email: data.email,
      password: data.password,
      statusId: data.statusId,
    }
    return persistenceEntity
  }

  static async toDomain(raw: UserEntity): Promise<User> {
    const domainEntity: User = {
      id: raw.id,
      password: raw.password,
      email: raw.email,
      statusId: raw.statusId,
    }
    return domainEntity
  }
}
