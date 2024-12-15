import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistRepository } from './playlist.repository'
import { PrismaService } from '../database/prisma.service'
import { PlaylistDto } from './dto/playlist.dto'
import { Playlist } from './domain/playlist.domain'
import { Playlist as PlaylistEntity } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { Status } from 'src/statuses/domain/status.domain'

describe('PlaylistRepository', () => {
  let playlistRepository: PlaylistRepository
  //let prismaService: PrismaService

  const prismaService = {
    playlist: {
      create: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistRepository,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile()

    playlistRepository = module.get<PlaylistRepository>(PlaylistRepository)
    //prismaService = module.get<PrismaService>(PrismaService)
  })

  describe('creating a playlist', () => {
    it('calls the repository with correct paramaters', async () => {
      const inputData: Playlist = {
        title: faker.lorem.word(),
        status: {id: 1}
      }

      const data: PlaylistEntity = {
        id: faker.string.uuid(),
        title: inputData.title,
        statusId: inputData.status.id
      }

      prismaService.playlist.create.mockResolvedValue(data)
      const result = await playlistRepository.save(inputData)
      expect(result).toEqual(data)
      
      console.log('RESULT DATA: ', result)
      expect(prismaService.playlist.create).toHaveBeenCalledWith({
        data: data,
      })
    })
  })
})
