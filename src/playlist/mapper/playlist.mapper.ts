import { Status } from 'src/statuses/domain/status.domain'
import { Playlist } from '../domain/playlist.domain'
import { Playlist as PlaylistEntity } from '@prisma/client'

export class PlaylistMapper {
  static async toPersistence(
    data: Playlist,
  ): Promise<Omit<PlaylistEntity, 'id'>> {
    const persistenceEntity: Omit<PlaylistEntity, 'id'> = {
      title: data.title,
    }
    return persistenceEntity
  }

  static async toDomain(raw: PlaylistEntity): Promise<Playlist> {
    const domainEntity: Playlist = {
      id: raw.id,
      title: raw.title,
    }
    return domainEntity
  }
}
