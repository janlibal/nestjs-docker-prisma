import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from 'nestjs-prisma'
import { PrismaService } from '../database/prisma.service'
import { AppRepository } from './app.repository'
import { SessionModule } from '../session/session.module'

@Module({
  imports: [PrismaModule, SessionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AppRepository],
})
export class AppModule {}
