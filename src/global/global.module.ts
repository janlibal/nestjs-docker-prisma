import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { AppModule } from 'src/app/app.module'
import appConfig from 'src/app/config/app.config'
import { PostModule } from 'src/post/post.module'
import { SessionModule } from 'src/session/session.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    AppModule,
    PrismaModule,
    SessionModule,
    PostModule,
  ],
})
export class GlobalModule {}
