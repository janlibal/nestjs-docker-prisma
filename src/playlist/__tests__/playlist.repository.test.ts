import { Test, TestingModule } from '@nestjs/testing'
import { Playlist } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { PlaylistRepository } from '../playlist.repository'

// Mock Prisma Service
const mockPrismaService = {
  playlist: {
    create: vi.fn(),
  },
}

describe('UserRepository', () => {
  let playlistRepository: PlaylistRepository
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile()

    playlistRepository = module.get<PlaylistRepository>(PlaylistRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(playlistRepository).toBeDefined()
  })

  describe('createPlaylist', () => {
    it('should create new playlist', async () => {
      const mockPlaylist: Playlist = { id: '1', title: 'Best summer tunes' }
      const createPlaylist = { title: 'Best summer tunes' }

      mockPrismaService.playlist.create.mockResolvedValue(mockPlaylist)

      const result = await playlistRepository.save(createPlaylist)

      expect(result).toEqual(mockPlaylist)
      expect(mockPrismaService.playlist.create).toHaveBeenCalledWith({
        data: createPlaylist,
      })
    })
  })
})
