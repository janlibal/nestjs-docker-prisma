import { Test } from '@nestjs/testing'
import { PrismaService } from '../../database/prisma.service'
import { PrismaModule } from '../../database/prisma.module'
import { UserRepository } from '../user.repository'

describe('PlaylistRepository', () => {
  let repository: UserRepository
  let prismaService: PrismaService

  beforeAll(async () => {
    jest.clearAllMocks()
    const app = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        {
          // how you provide the injection token in a test instance
          provide: UserRepository,
          // as a class value, Repository needs no generics
          useClass: PrismaService,
        },
      ],
    }).compile()

    repository = app.get<UserRepository>(UserRepository)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  describe('check if repo is defined', () => {
    it('repository should be defined', () => {
      expect(repository).toBeDefined()
    })
  })

  /*describe('create record in database', () => {
    it('should create playlist', async () => {
      jest.spyOn(prismaService.playlist, 'create').mockResolvedValueOnce(mockedPlaylistObject)
      expect(await repository.save(playlistDto)).toEqual(mockedPlaylistObject)
      expect(prismaService.playlist.create).toHaveBeenCalled()
    })
  })*/
})
