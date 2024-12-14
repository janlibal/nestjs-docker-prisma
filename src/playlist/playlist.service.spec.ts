import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistRepository } from './playlist.repository'
import { PlaylistService } from './playlist.service'
import { PlaylistDto } from './dto/playlist.dto'
import { Playlist as PlaylistEntity } from '@prisma/client'

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

    it('calls the repository with correct paramaters', async () => {
      const inputData: PlaylistDto = {
        title: 'Green Day',
      }

      const data: PlaylistEntity = {
        id: 'b545cb1e-5c4f-46c3-b42d-b3db8ffa87ce',
        title: inputData.title,
      }

      jest.spyOn(mockPlaylistRepository, 'save').mockReturnValue(data)

      const result = await playlistService.createOne(inputData)
      expect(mockPlaylistRepository.save).toBeCalled()
      expect(mockPlaylistRepository.save).toBeCalledWith(inputData)
      expect(result).toEqual(data)

    })
  })
})
