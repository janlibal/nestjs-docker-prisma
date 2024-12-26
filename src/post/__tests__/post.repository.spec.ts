import { Test } from '@nestjs/testing'
import { PrismaService } from '../../database/prisma.service'
import { PrismaModule } from '../../database/prisma.module'
import { PostRepository } from '../post.repository'
import { PostModule } from '../post.module'
import {
  createCommentDto,
  createPostDto,
  mockedCommentObject,
  mockedPostObject,
} from './mocks'

describe('PostRepository', () => {
  let repository: PostRepository
  let prismaService: PrismaService

  beforeAll(async () => {
    jest.clearAllMocks()
    const app = await Test.createTestingModule({
      imports: [PrismaModule, PostModule],
      providers: [
        PostRepository,
        {
          // how you provide the injection token in a test instance
          provide: PostRepository,
          // as a class value, Repository needs no generics
          useClass: PrismaService,
        },
      ],
    }).compile()

    repository = app.get<PostRepository>(PostRepository)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  describe('check if repo is defined', () => {
    it('repository should be defined', () => {
      expect(repository).toBeDefined()
    })
  })

  describe('create post in database', () => {
    it('should create a new post', async () => {
      jest
        .spyOn(prismaService.post, 'create')
        .mockResolvedValueOnce(mockedPostObject)
      expect(await repository.createPost(createPostDto)).toEqual(
        mockedPostObject,
      )
      expect(prismaService.post.create).toHaveBeenCalled()
    })
  })

  describe('create comment for post in database', () => {
    it('should create a new comment for a post', async () => {
      jest
        .spyOn(prismaService.comment, 'create')
        .mockResolvedValueOnce(mockedCommentObject)
      expect(await repository.createComment(createCommentDto)).toEqual(
        mockedCommentObject,
      )
      expect(prismaService.comment.create).toHaveBeenCalled()
    })
  })
})
