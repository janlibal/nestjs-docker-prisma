import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { TaskDto } from './dto/task.dto'
import { Task } from './domain/task.domain'
import { TaskService } from './task.service'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() taskDto: TaskDto): Promise<Task> {
    return this.taskService.serveTask(taskDto)
  }
}
