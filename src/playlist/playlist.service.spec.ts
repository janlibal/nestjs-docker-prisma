import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistRepository } from './playlist.repository'
import { PlaylistService } from './playlist.service'
import { PlaylistDto } from './dto/playlist.dto'
import { Playlist as PlaylistEntity } from '@prisma/client'
import { faker } from '@faker-js/faker'

describe('PlaylistService', () => {
  let playlistService: PlaylistService

  const mockPlaylistRepository = {
    save: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        {
          provide: PlaylistRepository,
          useValue: mockPlaylistRepository,
        },
      ],
    }).compile()

    playlistService = module.get<PlaylistService>(PlaylistService)
  })

  describe('Playlist', () => {
    it('should be defined', () => {
      expect(playlistService).toBeDefined()
    })

    /*it('calls the repository with correct paramaters', async () => {
      const inputData: PlaylistDto = {
        title: faker.lorem.word()
      }

      const data: PlaylistEntity = {
        id: faker.string.uuid(),
        title: inputData.title,
        statusId: 1
      }

      jest.spyOn(mockPlaylistRepository, 'save').mockReturnValue(data)

      const result = await playlistService.createOne(inputData)
      expect(mockPlaylistRepository.save).toBeCalled()
      expect(mockPlaylistRepository.save).toBeCalledWith(inputData)
      expect(result).toEqual(data)

    })*/
  })
})
