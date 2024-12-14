import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistRepository } from './playlist.repository'
import { PrismaService } from '../database/prisma.service'
import { PlaylistDto } from './dto/playlist.dto'
import { Playlist } from './domain/playlist.domain'
import { Playlist as PlaylistEntity } from '@prisma/client'

describe('PlaylistRepository', () => {
  let playlistRepository: PlaylistRepository
  let prismaService: PrismaService

  const mockPrismaService = {
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
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    playlistRepository = module.get<PlaylistRepository>(PlaylistRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  describe('creating a playlist', () => {
    it('calls the repository with correct paramaters', async () => {
      const inputData: Playlist = {
        title: 'Green Day',
      }

      const data: PlaylistEntity = {
        id: 'b545cb1e-5c4f-46c3-b42d-b3db8ffa87ce',
        title: inputData.title,
      }

      /*const playlistRepositorySaveSpy = jest.spyOn(playlistRepository, 'save').mockResolvedValue(savedPlaylist);
    const playlistRepositoryCreateSpy = jest.spyOn(playlistRepository, 'create').mockReturnValue(createdPlaylistEntity);
    const result = await playlistRepository.save(createPlaylistData);
    expect(playlistRepositoryCreateSpy).toBeCalledWith(createPlaylistData);
    expect(playlistRepositorySaveSpy).toBeCalledWith(createdPlaylistEntity);
    expect(result).toEqual(savedPlaylist);*/

      mockPrismaService.playlist.create.mockResolvedValue(data)
      const result = await playlistRepository.save(inputData)
      expect(result).toEqual(data)
      expect(mockPrismaService.playlist.create).toHaveBeenCalledWith({
        data: inputData,
      })
    })
  })
})
