import { Comment as CommentDomain } from '../domain/comment.domain'
import { Comment as CommentEntity } from '@prisma/client'
import { PostMapper } from './post.mapper'

export class CommentMapper {
  static async toPersistence(data: CommentDomain): Promise<CommentEntity> {
    const persistenceEntity: CommentEntity = {
      id: data.id,
      content: data.content,
      postId: data.postId,
    }
    return persistenceEntity
  }

  static async toDomain(raw: CommentEntity): Promise<CommentDomain> {
    const domainEntity: CommentDomain = {
      id: raw.id,
      //postId: raw.postId,
      content: raw.content,
      ...raw,
    }
    return domainEntity
  }
}
