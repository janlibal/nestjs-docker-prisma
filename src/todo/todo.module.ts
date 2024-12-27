import { Module } from '@nestjs/common'
import { ExampleController } from './example.controller';
import { TodoController } from './todo.controller';

@Module({
  imports: [],
  controllers: [ExampleController, TodoController],
  providers: [],
})
export class TodoModule {}

/*
@Module({
  imports: [CqrsModule],
  controllers: [TaskController],
  providers: [TaskService, CreateTaskHandler, TaskRepository],
})
export class TaskModule {}

*/