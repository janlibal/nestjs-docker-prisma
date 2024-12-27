import { Task } from "../domain/task.domain"
import { Task as TaskEntity } from '@prisma/client'


export class TaskMapper {
  static async toPersistence(data: Task): Promise<Omit<TaskEntity, 'id'>> {
    const persistenceEntity: Omit<TaskEntity, 'id'> = {
      description: data.description
    }
    return persistenceEntity
  }

  static async toDomain(raw: TaskEntity): Promise<Task> {
    const domainEntity: Task = {
      id: raw.id,
      description: raw.description
    }
    return domainEntity
  }
}
