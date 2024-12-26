import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TaskController } from './task.controller'
import { CreateTaskHandler } from './handlers/create.task.handler'
import { TaskRepository } from './task.repository'
import { TaskService } from './task.service'

@Module({
  imports: [CqrsModule],
  controllers: [TaskController],
  providers: [TaskService, CreateTaskHandler, TaskRepository],
})
export class TaskModule {}
