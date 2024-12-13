import { User as UserEntity } from '@prisma/client'
import { User } from '../domain/user.domain'


export class AppMapper {
  static async toPersistence(data: User,): Promise<Omit<UserEntity, 'id'>> {
    const persistenceEntity: Omit<UserEntity, 'id'> = {
      email: data.email,
      password: data.password,
    }
    return persistenceEntity
  }

  static async toDomain(raw: UserEntity): Promise<User> {
    const domainEntity: User = {
      id: raw.id,
      password: raw.password,
      email: raw.email,
    }
    return domainEntity
  }
}
