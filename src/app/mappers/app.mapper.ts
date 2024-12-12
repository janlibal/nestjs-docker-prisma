import { User as UserEntity } from '@prisma/client'
import { User } from '../domain/user.domain'
import { Status } from '../../statuses/domain/status.domain'

export class AppMapper {
  static async toPersistence(data: User,): Promise<Omit<UserEntity, 'id'>> {
    const persistenceEntity: Omit<UserEntity, 'id'> = {
      email: data.email,
      password: data.password,
      statusId: data.status.id
    }
    console.log('PERSISTENCE ENTITY: ', persistenceEntity.statusId)
    return persistenceEntity
  }

  static async toDomain(raw: UserEntity): Promise<User> {
    let status: Status | undefined = undefined
    status = new Status()
    status = { id: Number(raw.statusId) }
    console.log('STATUS:', raw.statusId)

    const domainEntity: User = {
      id: raw.id,
      password: raw.password,
      email: raw.email,
      status: status
    }
    console.log('DOMAIn ENTITY: ', domainEntity.status.id)
    return domainEntity
  }
}
