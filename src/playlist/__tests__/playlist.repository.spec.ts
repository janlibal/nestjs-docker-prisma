import { Test } from '@nestjs/testing'
import { PrismaService } from '../../database/prisma.service'
import { PlaylistRepository } from '../playlist.repository'
import { PrismaModule } from '../../database/prisma.module'
import { PlaylistModule } from '../playlist.module'
import { LoggerModule } from '../../logger/logger.module'
import { PinoLoggerService } from '../../logger/adapters/pino.logger.service'
import { mockedPlaylistObject, playlistDto } from './mocks'

describe('PlaylistRepository', () => {
  let repository: PlaylistRepository
  let prismaService: PrismaService

  beforeAll(async () => {
    jest.clearAllMocks()
    const app = await Test.createTestingModule({
      imports: [PrismaModule, PlaylistModule, LoggerModule],
      providers: [
        PinoLoggerService,
        PlaylistRepository,
        {
          // how you provide the injection token in a test instance
          provide: PlaylistRepository,
          // as a class value, Repository needs no generics
          useClass: PrismaService,
        },
      ],
    }).compile()

    repository = app.get<PlaylistRepository>(PlaylistRepository)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  describe('check if repo is defined', () => {
    it('repository should be defined', () => {
      expect(repository).toBeDefined()
    })
  })

  describe('create record in database', () => {
    it('should create playlist', async () => {
      jest
        .spyOn(prismaService.playlist, 'create')
        .mockResolvedValueOnce(mockedPlaylistObject)
      expect(await repository.save(playlistDto)).toEqual(mockedPlaylistObject)
      expect(prismaService.playlist.create).toHaveBeenCalled()
    })
  })
})
