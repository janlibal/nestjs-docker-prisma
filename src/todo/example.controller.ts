import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'
import { Observable } from 'rxjs'

interface Todo {
  id: string
  title: string
  completed: boolean
}

@Controller('example')
export class ExampleController {
  private todos: Todo[] = []

  @Get()
  getAllTodos(): Observable<Todo[]> {
    return new Observable((observer) => {
      observer.next(this.todos)
      observer.complete()
    })
  }

  @Post()
  createTodo(@Body() todo: Todo): Observable<Todo> {
    return new Observable((observer) => {
      this.todos.push(todo)
      observer.next(todo)
      observer.complete()
    })
  }

  @Delete(':id')
  deleteTodoById(@Param('id') id: string): Observable<void> {
    return new Observable((observer) => {
      const index = this.todos.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        this.todos.splice(index, 1)
      }
      observer.next()
      observer.complete()
    })
  }

  @Post(':id/complete')
  completeTodoById(@Param('id') id: string): Observable<Todo> {
    return new Observable((observer) => {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = true
        observer.next(todo)
      }
      observer.complete()
    })
  }
}
