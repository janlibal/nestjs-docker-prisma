import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { AppModule } from '../app/app.module'
import appConfig from '../app/config/app.config'
import { PlaylistModule } from '../playlist/playlist.module'
import { PostModule } from '../post/post.module'
import { SessionModule } from '../session/session.module'
import { LoggerModule } from 'src/logger/logger.module'
import { TaskModule } from 'src/task/task.module'
import { TodoModule } from 'src/todo/todo.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    LoggerModule,
    AppModule,
    PrismaModule,
    SessionModule,
    PlaylistModule,
    PostModule,
    TaskModule,
    TodoModule,
  ],
})
export class GlobalModule {}
