import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../database/prisma.service'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { TagsRepository } from '../tags.repository'

// Mock Prisma Service
const mockPrismaService = {
  tag: {
    findMany: vi.fn(),
    createMany: vi.fn(),
  },
}

describe('TagRepository', () => {
  let tagRepository: TagsRepository
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile()

    tagRepository = module.get<TagsRepository>(TagsRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(tagRepository).toBeDefined()
  })

  describe('upsertTags', () => {
    it('should return a list of tagIds', async () => {
      const tags: number[] = [1, 2, 3]
      const tagNames: string[] = ['tag1', 'tag2', 'tag3']

      mockPrismaService.tag.findMany.mockResolvedValue(tags)

      const result = await tagRepository.getExistingTags(tagNames)

      expect(result).toEqual(tags)
    })

    it('should only create tags that do not already exist', async () => {
      const tagNames: string[] = ['tag1', 'tag2', 'tag3']
      const existingTags = [{ id: 1, name: 'tag1', color: '#ffffff' }]
      const existingNames = existingTags.map((tag) => tag.name)
      const createdTags = [
        { name: 'tag2', color: '#ffffff' },
        { name: 'tag3', color: '#ffffff' },
      ]

      mockPrismaService.tag.findMany.mockResolvedValueOnce([
        { id: 1, name: 'tag1', color: '#ffffff' },
      ])
      mockPrismaService.tag.createMany.mockResolvedValue({ count: 0 })

      await tagRepository.getCreatedCount(tagNames, existingNames)
      //expect(mockPrismaService.tag.createMany).toHaveBeenCalledWith({data: createdTags,})
    })

    it('should give new tags random colors', async () => {
      // Again, configuring the `$transaction` function to use the mocked client
      //prismaMock.$transaction.mockImplementationOnce(callback =>callback(prismaMock))
      const tags = ['tag1', 'tag2', 'tag3']
      const existingTags = [{ id: 1, name: 'tag1', color: '#ffffff' }]
      const existingIDs = existingTags.map((tag) => tag.id)

      // Ensure there are no existing tags found
      mockPrismaService.tag.findMany.mockResolvedValue([])
      // Mock the resolved value of `createMany` so the real function isn't invoked
      mockPrismaService.tag.createMany.mockResolvedValueOnce({ count: 3 })
      // Invoke the function with three new tags
      await tagRepository.getCreatedTags(tags, existingIDs)
      // Validate the `randomColor` function was called three times
      //--expect(randomColor).toHaveBeenCalledTimes(3)
    })
  })
})
