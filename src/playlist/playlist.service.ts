import { Injectable } from '@nestjs/common'
import { PlaylistDto } from './dto/playlist.dto'
import { Playlist } from './domain/playlist.domain'
import { PlaylistRepository } from './playlist.repository'
import { Playlist as PlaylistEntity } from '@prisma/client'

@Injectable()
export class PlaylistService {
  constructor(private playlistRepository: PlaylistRepository) {}

  async createOne(playlistDto: PlaylistDto): Promise<PlaylistEntity> {
    const clonedPayload: Playlist = {
      title: playlistDto.title,
    }
    return await this.playlistRepository.save(clonedPayload)
  }
}
