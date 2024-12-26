import { Playlist as PlaylistDomain } from '../domain/playlist.domain'
import { Playlist as PlaylistEntity } from '@prisma/client'

export const playlistDto: PlaylistDomain = {
  title: 'Bon Jovi',
}

export const mockedPlaylistObject: PlaylistEntity = {
  id: '52e34616-79b2-4e7b-8444-0c3edcc760fd',
  title: 'Bon Jovi',
}
