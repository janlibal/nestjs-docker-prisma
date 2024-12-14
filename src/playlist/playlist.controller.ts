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

@Controller()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('playlist')
  @HttpCode(HttpStatus.OK)
  public insert(@Body() playlistDto: PlaylistDto): Promise<Playlist> {
    return this.playlistService.createOne(playlistDto)
  }
}
