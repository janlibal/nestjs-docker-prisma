import { User as UserEntity } from '@prisma/client'
import { User } from '../domain/user.domain'
import { Status } from 'src/statuses/domain/status.domain'

export class AppMapper {
  static async toPersistence(data: User): Promise<Omit<UserEntity, 'id'>> {
    const persistenceEntity: Omit<UserEntity, 'id'> = {
      email: data.email,
      password: data.password,
      statusId: data.status.id,
    }
    console.log('PERSISTENCE: ', persistenceEntity)
    return persistenceEntity
  }

  static async toDomain(raw: UserEntity): Promise<User> {
    const statusObject: Status = {
      id: raw.statusId
    }
    const domainEntity: User = {
      id: raw.id,
      password: raw.password,
      email: raw.email,
      status: statusObject
    }
    console.log('DOMAIN: ', domainEntity)
    return domainEntity
  }
}
