import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { Playlist } from './domain/playlist.domain'
import { PlaylistMapper } from './mapper/playlist.mapper'

@Injectable()
export class PlaylistRepository {
  constructor(private prisma: PrismaService) {}
  async save(data: Playlist): Promise<Playlist> {
    const persistenceModel = await PlaylistMapper.toPersistence(data)
    const newEntity = await this.prisma.playlist.create({ data: persistenceModel })
    return await PlaylistMapper.toDomain(newEntity)
  }
}

/*

async save(data: User): Promise<User> {
    const persistenceModel = await AppMapper.toPersistence(data)
    const newEntity = await this.prisma.user.create({ data: persistenceModel })
    return await AppMapper.toDomain(newEntity)
  }

  */
