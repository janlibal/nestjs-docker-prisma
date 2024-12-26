import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { PlaylistService } from './playlist.service'
import { Playlist } from './domain/playlist.domain'
import { PlaylistDto } from './dto/playlist.dto'
import { PinoLoggerService } from '../logger/adapters/pino.logger.service'

@Controller()
export class PlaylistController {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly logger: PinoLoggerService,
  ) {
    this.logger.setContext('PlaylistController')
  }

  @Post('playlist')
  @HttpCode(HttpStatus.OK)
  public insert(@Body() playlistDto: PlaylistDto): Promise<Playlist> {
    this.logger.log('Parsing data started')
    return this.playlistService.createOne(playlistDto)
  }
}
