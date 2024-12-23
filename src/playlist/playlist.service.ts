import { Injectable } from '@nestjs/common'
import { PlaylistDto } from './dto/playlist.dto'
import { Playlist } from './domain/playlist.domain'
import { PlaylistRepository } from './playlist.repository'
import { PinoLoggerService } from 'src/logger/adapters/pino.logger.service'

@Injectable()
export class PlaylistService {
  constructor(private playlistRepository: PlaylistRepository, private readonly logger: PinoLoggerService) {this.logger.setContext('PlaylistService')}

  async createOne(playlistDto: PlaylistDto): Promise<Playlist> {
    this.logger.log('Processing data started')
    const clonedPayload: Playlist = {
      title: playlistDto.title,
    }
    this.logger.log('Processing data finished')
    return await this.playlistRepository.save(clonedPayload)
  }
}
