import { Injectable } from '@nestjs/common'
import { Task } from './domain/task.domain'

@Injectable()
export class TaskRepository {
  constructor() {}
  async save(data: Task): Promise<Task> {
    return data
  }
}
