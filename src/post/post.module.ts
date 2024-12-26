import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { PostRepository } from './post.repository'
import { PrismaModule } from '../database/prisma.module'
import { PrismaService } from '../database/prisma.service'

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, PrismaService, PostRepository],
})
export class PostModule {}

/*
@Module({
  imports: [PrismaModule, SessionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AppRepository],
})
export class AppModule {}*/
