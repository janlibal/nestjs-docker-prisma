import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { PrismaService } from 'src/database/prisma.service'
import { SessionService } from './session.service'
import { SessionRepository } from './session.repository'

@Module({
  imports: [PrismaModule],
  providers: [SessionService, PrismaService, SessionRepository],
  exports: [SessionService],
})
export class SessionModule {}
