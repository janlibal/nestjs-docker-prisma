import { Injectable } from '@nestjs/common'
import { PostRepository } from './post.repository'
import { Post } from './domain/post.domain'
import { CreatePostDto } from './dto/create.post.dto'
import { CreateCommentDto } from './dto/create.comment.dto'
import { Comment as CommentEntity } from '@prisma/client'
import { Comment as CommentDomain } from './domain/comment.domain'

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepository.createPost(createPostDto)
  }

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentDomain> {
    return await this.postRepository.createComment(createCommentDto)
  }
}
