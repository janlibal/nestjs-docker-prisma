import { Expose } from 'class-transformer'

export class EnvDto {
  @Expose()
  nodeVersion: string

  @Expose()
  hostName: string

  @Expose()
  platform: string
}
