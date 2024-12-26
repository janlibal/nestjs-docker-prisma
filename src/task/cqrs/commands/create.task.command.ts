import { Injectable } from '@nestjs/common'
import { Task } from 'src/task/domain/task.domain'
import { TaskDto } from 'src/task/dto/task.dto'

@Injectable()
export class CreateTaskCommand {
  taskObject: Task
  constructor(taskDto: TaskDto) {
    this.taskObject = taskDto
  }
}
