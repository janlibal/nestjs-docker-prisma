import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateTaskCommand } from '../cqrs/commands/create.task.command'
import { Task } from '../domain/task.domain'
import { TaskRepository } from '../task.repository'

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(command: CreateTaskCommand): Promise<Task> {
    const { taskObject } = command
    const data: Task = {
      description: taskObject.description,
    }
    return this.taskRepository.save(data)
  }
}
