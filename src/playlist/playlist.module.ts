import { Module } from '@nestjs/common'
import { PlaylistController } from './playlist.controller'
import { PlaylistService } from './playlist.service'
import { PrismaModule } from 'nestjs-prisma'
import { PrismaService } from '../database/prisma.service'
import { PlaylistRepository } from './playlist.repository'

@Module({
  imports: [PrismaModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PrismaService, PlaylistRepository],
})
export class PlaylistModule {}
