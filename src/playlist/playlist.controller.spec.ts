import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistService } from './playlist.service'
import { PlaylistDto } from './dto/playlist.dto'
import { Playlist as PlaylistEntity } from '@prisma/client'
import { PlaylistController } from './playlist.controller'
import { faker } from '@faker-js/faker'

describe('PlaylistController', () => {
  let playlistController: PlaylistController

  const mockPlaylistService = {
    createOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistController,
        {
          provide: PlaylistService,
          useValue: mockPlaylistService,
        },
      ],
    }).compile()

    playlistController = module.get<PlaylistController>(PlaylistController)
  })

  describe('Playlist', () => {
    it('should be defined', () => {
      expect(playlistController).toBeDefined()
    })

    /*it('should create new playlist and return data', async () => {
      const inputData: PlaylistDto = {
        title: faker.lorem.word()
      }

      const data: PlaylistEntity = {
        id: faker.string.uuid(),
        title: inputData.title,
        statusId: 1
      }

      jest
        .spyOn(mockPlaylistService, 'createOne')
        .mockReturnValue(data)

      const result = await playlistController.insert(inputData)
      expect(mockPlaylistService.createOne).toBeCalled()
      expect(mockPlaylistService.createOne).toBeCalledWith(inputData)
      expect(result).toEqual(data)
    })*/
  })
})
