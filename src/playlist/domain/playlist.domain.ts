import { Type } from "class-transformer"
import { Status } from "../../statuses/domain/status.domain"

export class Playlist {
  public id?: string
  public title: string
  @Type(() => Status) 
  status?: Status
}
