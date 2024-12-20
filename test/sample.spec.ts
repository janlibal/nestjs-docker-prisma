// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistRepository } from '../src/playlist/playlist.repository'
import { PrismaService } from '../src/database/prisma.service'
import { vi, describe, beforeEach, it, expect } from 'vitest'

// Mock the PrismaService
vi.mock('../src/database/prisma.service')

describe('PlaylistRepository', () => {
  let repository: PlaylistRepository
  let prismaService: PrismaService

  beforeEach(async () => {
    // Create a testing module with the necessary providers
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistRepository, PrismaService],
    })
      .overrideProvider(PrismaService) // Override PrismaService with the mock
      .useValue({ playlist: { create: vi.fn() } }) // Mock the user methods
      .compile()

    repository = module.get<PlaylistRepository>(PlaylistRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('PlaylistRepository should be defined', () => {
    expect(repository).toBeDefined()
  })

  it('should create a new record', async () => {
    const playlistDto = { title: 'Band name' }

    // Mock the Prisma create method to return a promise that resolves with a user object
    prismaService.playlist.create = vi.fn().mockResolvedValue(playlistDto)

    const result = await repository.save(playlistDto)

    expect(result).toEqual(playlistDto) // Check that the result matches the mock
    expect(prismaService.playlist.create).toHaveBeenCalledWith({data: playlistDto})
  })
})
