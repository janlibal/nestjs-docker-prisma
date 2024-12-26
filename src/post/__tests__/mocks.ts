import { Post as PostDomain } from '../domain/post.domain'
import { Post as PostEntity } from '@prisma/client'
import { CreateCommentDto } from '../dto/create.comment.dto'

export const createPostDto: PostDomain = {
  title: 'My Post!!!',
}

export const mockedPostObject: PostEntity = {
  id: 1,
  title: 'My Post!!!',
}

export const createCommentDto: CreateCommentDto = {
  postId: 1,
  content: 'My Comment!',
}

export const mockedCommentObject = {
  id: 1,
  content: 'My Comment!',
  postId: 1,
}
