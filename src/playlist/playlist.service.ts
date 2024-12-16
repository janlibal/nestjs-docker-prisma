import { Injectable } from '@nestjs/common'
import { PlaylistDto } from './dto/playlist.dto'
import { Playlist } from './domain/playlist.domain'
import { PlaylistRepository } from './playlist.repository'

@Injectable()
export class PlaylistService {
  constructor(private playlistRepository: PlaylistRepository) {}

  async createOne(playlistDto: PlaylistDto): Promise<Playlist> {
    const clonedPayload: Playlist = {
      title: playlistDto.title
    }
    return await this.playlistRepository.save(clonedPayload)
  }
}
