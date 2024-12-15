import { Status } from "src/statuses/domain/status.domain"
import { Playlist } from "../domain/playlist.domain"
import { Playlist as PlaylistEntity } from '@prisma/client'


export class PlaylistMapper {
  static async toPersistence(data: Playlist): Promise<Omit<PlaylistEntity, 'id'>> {
    const persistenceEntity: Omit<PlaylistEntity, 'id'> = {
      title: data.title,
      statusId: data.status.id
    }
    return persistenceEntity
  }

  static async toDomain(raw: PlaylistEntity): Promise<Playlist> {
    const status: Status = {
        id: raw.statusId
    }
    const domainEntity: Playlist = {
      id: raw.id,
      title: raw.title,
      status: status
    }
    return domainEntity
  }
}
