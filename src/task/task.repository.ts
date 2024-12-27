import { Injectable } from '@nestjs/common'
import { Task } from './domain/task.domain'
import { PrismaService } from '../database/prisma.service'
import { TaskMapper } from './mappers/task.mappers'

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}
  async save(data: Task): Promise<Task> {
    const persistenceModel = await TaskMapper.toPersistence(data)
    const newEntity = await this.prisma.task.create({ data: persistenceModel })
    return await TaskMapper.toDomain(newEntity)
  }
}
