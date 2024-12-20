import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { Playlist } from './domain/playlist.domain'
import { PlaylistMapper } from './mapper/playlist.mapper'
import { Playlist as PlaylistEntity } from '@prisma/client'

@Injectable()
export class PlaylistRepository {
  constructor(private prisma: PrismaService) {}
  async save(data: Playlist): Promise<PlaylistEntity> {
    //const persistenceModel = await PlaylistMapper.toPersistence(data)
    const newEntity = await this.prisma.playlist.create({ data: data })
    return newEntity //await PlaylistMapper.toDomain(newEntity)
  }
}
