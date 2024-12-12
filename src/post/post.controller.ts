import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CreatePostDto } from './dto/create.post.dto'
import { PostService } from './post.service'
import { Post as PostDomain } from './domain/post.domain'
import { CreateCommentDto } from './dto/create.comment.dto'
import { Comment as CommentDomain } from './domain/comment.domain'

class FakePost {
  id?: number
  title: string
  comments: Comment[] = []
}

class FakePostDto {
  title: string
  comments: string[] = []
}

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Post('test/post')
  @HttpCode(HttpStatus.OK)
  public async testPost(@Body() createPostDto: FakePostDto) {
    //}: Promise<PostDomain> {
    const data = {
      title: createPostDto.title,
      comments: createPostDto.comments,
    }
    return data
  }

  @Post('post')
  @HttpCode(HttpStatus.OK)
  public async post(@Body() createPostDto: CreatePostDto): Promise<PostDomain> {
    return await this.postService.createPost(createPostDto)
  }

  @Post('comment')
  @HttpCode(HttpStatus.OK)
  public async comment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDomain> {
    return await this.postService.createComment(createCommentDto)
  }
}
