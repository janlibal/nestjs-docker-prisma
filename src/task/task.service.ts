import { Injectable } from '@nestjs/common'
import { TaskDto } from './dto/task.dto'
import { Task } from './domain/task.domain'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateTaskCommand } from './cqrs/commands/create.task.command'

@Injectable()
export class TaskService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async serveTask(taskDto: TaskDto): Promise<Task> {
    return this.commandBus.execute(new CreateTaskCommand(taskDto))
  }
}
