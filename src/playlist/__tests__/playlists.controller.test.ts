import { Test, TestingModule } from '@nestjs/testing'
import { Playlist } from '../domain/playlist.domain'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { PlaylistService } from '../playlist.service'
import { PinoLoggerService } from '../../logger/adapters/pino.logger.service'
import { LoggerModule } from '../../logger/logger.module'
import { PlaylistController } from '../playlist.controller'
import { PlaylistDto } from '../dto/playlist.dto'
import { PlaylistRepository } from '../playlist.repository'

// Mock Prisma Service
const mockPlaylistService = {
    createOne: vi.fn(),
}

describe('PlaylistController', () => {
  let playlistController: PlaylistController
  let playlistService: PlaylistService
  let logger: PinoLoggerService

  beforeEach(async () => {    
    const module: TestingModule = await Test.createTestingModule({
        imports: [LoggerModule],
      providers: [
        PlaylistController,
        { 
            provide: PlaylistService, 
            useValue: mockPlaylistService 
        },
        PinoLoggerService,
      ],
    }).compile()

    playlistController = module.get<PlaylistController>(PlaylistController)
    playlistService = module.get<PlaylistService>(PlaylistService)
    logger = module.get<PinoLoggerService>(PinoLoggerService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(PlaylistRepository).toBeDefined()
  })

  describe('insert', () => {
    it('should capture data for further processing', async () => {
      const mockPlaylist: Playlist = { id: '1', title: 'Best summer tunes' }
      const createPlaylist: PlaylistDto = { title: 'Best summer tunes' }

      mockPlaylistService.createOne.mockResolvedValue(mockPlaylist)

      const result = await playlistController.insert(createPlaylist)

      expect(result).toEqual(mockPlaylist)
      //expect(mockPlaylistService.createOne).toHaveBeenCalledWith({data: createPlaylist,})
    })
  })
})
