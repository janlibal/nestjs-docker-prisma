import { Post as PostEntity } from '@prisma/client'
import { Post } from '../domain/post.domain'
export class PostMapper {
  static async toPersistence(data: Post): Promise<PostEntity> {
    const persistenceEntity: PostEntity = {
      id: data.id,
      title: data.title,
    }
    return persistenceEntity
  }

  static async toDomain(raw: PostEntity): Promise<Post> {
    const domainEntity: Post = {
      id: raw.id,
      title: raw.title,
    }
    return domainEntity
  }
}
