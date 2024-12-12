import { Injectable } from '@nestjs/common'
import { Post } from './domain/post.domain'
import { PrismaService } from '../database/prisma.service'
import { PostMapper } from './mapper/post.mapper'
import { Comment as CommentDomain } from './domain/comment.domain'
import { CommentMapper } from './mapper/comment.mapper'
import { Comment as CommentEntity } from '@prisma/client'

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: Post): Promise<Post> {
    const persistenceEntity = await PostMapper.toPersistence(data)
    const newEntity = await this.prisma.post.create({ data: persistenceEntity })
    return await PostMapper.toDomain(newEntity)

    /*const prismaPost = await this.prisma.post.create({
      data: toPersistencePost(domainPost), // Convert domain to persistence
      include: {
        comments: true, // Include comments after creating the post
      },
    });

    return toDomainPost(prismaPost); // Convert back to domain*/
  }

  async createComment(data: CommentDomain): Promise<CommentDomain> {
    const persistenceEntity = await CommentMapper.toPersistence(data)
    const comment = await this.prisma.comment.create({
      data: persistenceEntity,
      include: { post: true },
    })
    /*const comment= await this.prisma.comment.create({ 
      include: {
        post: true
      },
      data: {
        id: persistenceEntity.id,
        content: persistenceEntity.content,
        postId: persistenceEntity.postId
      }
    }) */
    return await CommentMapper.toDomain(comment)
  }
}
