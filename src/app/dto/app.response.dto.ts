import { Expose, Type } from 'class-transformer'
import { EnvDto } from './env.dto'

export class AppResponseDto {
  @Expose()
  name: string

  @Expose()
  version: string

  @Expose()
  description: string

  @Expose()
  @Type(() => EnvDto)
  env: EnvDto
}
