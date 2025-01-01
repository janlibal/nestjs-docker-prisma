import { Test, TestingModule } from '@nestjs/testing'
import { Playlist } from '../domain/playlist.domain'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { PlaylistService } from '../playlist.service'
import { PlaylistRepository } from '../playlist.repository'
import { PinoLoggerService } from '../../logger/adapters/pino.logger.service'
import { LoggerModule } from '../../logger/logger.module'
import { PlaylistDto } from '../dto/playlist.dto'

// Mock Prisma Service
const mockPlaylistRepository = {
    save: vi.fn(),
}

describe('PlaylistService', () => {
  let playlistService: PlaylistService
  let playlistRepository: PlaylistRepository
  let logger: PinoLoggerService

  beforeEach(async () => {    
    const module: TestingModule = await Test.createTestingModule({
        imports: [LoggerModule],
      providers: [
        PlaylistService,
        { 
            provide: PlaylistRepository, 
            useValue: mockPlaylistRepository 
        },
        PinoLoggerService
      ],
    }).compile()

    playlistService = module.get<PlaylistService>(PlaylistService)
    playlistRepository = module.get<PlaylistRepository>(PlaylistRepository)
    logger = module.get<PinoLoggerService>(PinoLoggerService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(playlistService).toBeDefined()
  })

  describe('createOne', () => {
    it('should process data for saving new playlist', async () => {
      const mockPlaylist: Playlist = { id: '1', title: 'Best summer tunes' }
      const createPlaylist: PlaylistDto = { title: 'Best summer tunes' }

      mockPlaylistRepository.save.mockResolvedValue(mockPlaylist)

      const result = await playlistService.createOne(createPlaylist)

      expect(result).toEqual(mockPlaylist)
      //expect(mockPlaylistRepository.save).toHaveBeenCalledWith({data: createPlaylist,})
    })
  })
})
